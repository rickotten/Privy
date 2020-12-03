from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, SocialSerializer, ForgotSerializer, UserPostSerializer, UserPostCommentSerializer, FriendRequestSerializer, PageSerializer, UserPrivacySerializer, UserProfileSerializer, UserSettingsSerializer, TinyPageSerializer
from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient
import os
import random
import logging
from django.conf import settings

from rest_framework import generics, permissions, status, filters
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser, FileUploadParser
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from knox.models import AuthToken
from .models import UserPost, User, Friend, Page, UserProfile, UserSettings
from itertools import *



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from requests.exceptions import HTTPError

from social_django.utils import psa

from django.contrib.auth import authenticate
from .models import User

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        UserSettings.objects.create(user=user)
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        try:
            settings = user.settings
        except:
            UserSettings.objects.create(user=user)
        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# OAuth Token Exchange
# Source adapted from https://github.com/coriolinus/oauth2-article/blob/master/views.py
@api_view(http_method_names=['POST'])
@permission_classes([AllowAny])
@psa()
def exchange_token(request, backend):
    """
    Exchange an OAuth2 access token for one for this site.
    This simply defers the entire OAuth2 process to the front end.
    The front end becomes responsible for handling the entirety of the
    OAuth2 process; we just step in at the end and use the access token
    to populate some user identity.
    The URL at which this view lives must include a backend field, like:
        url(API_ROOT + r'social/(?P<backend>[^/]+)/$', exchange_token),
    Using that example, you could call this endpoint using i.e.
        POST API_ROOT + 'social/facebook/'
        POST API_ROOT + 'social/google-oauth2/'
    Note that those endpoint examples are verbatim according to the
    PSA backends which we configured in settings.py. If you wish to enable
    other social authentication backends, they'll get their own endpoints
    automatically according to PSA.
    ## Request format
    Requests must include the following field
    - `access_token`: The OAuth2 access token provided by the provider
    """
    serializer = SocialSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        # set up non-field errors key
        # http://www.django-rest-framework.org/api-guide/exceptions/#exception-handling-in-rest-framework-views
        try:
            nfe = settings.NON_FIELD_ERRORS_KEY
        except AttributeError:
            nfe = 'non_field_errors'

        try:
            # this line, plus the psa decorator above, are all that's necessary to
            # get and populate a user object for any properly enabled/configured backend
            # which python-social-auth can handle.
            user = request.backend.do_auth(serializer.validated_data['access_token'])
            UserProfile.objects.create(user=user)
        except HTTPError as e:
            # An HTTPError bubbled up from the request to the social auth provider.
            # This happens, at least in Google's case, every time you send a malformed
            # or incorrect access key.
            return Response(
                {'errors': {
                    'token': 'Invalid token',
                    'detail': str(e),
                }},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user:
            if user.is_active:
                return Response(
                    {
                        "user": UserSerializer(
                            user
                        ).data,
                        "token": AuthToken.objects.create(user)[1],
                    })

                # token = AuthToken.objects.create(user)[1]
                # return Response({'token': token})
            else:
                # user is not active; at some point they deleted their account,
                # or were banned by a superuser. They can't just log in with their
                # normal credentials anymore, so they can't log in with social
                # credentials either.
                return Response(
                    {'errors': {nfe: 'This user account is inactive'}},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            # Unfortunately, PSA swallows any information the backend provider
            # generated as to why specifically the authentication failed;
            # this makes it tough to debug except by examining the server logs.
            return Response(
                {'errors': {nfe: "Authentication Failed"}},
                status=status.HTTP_400_BAD_REQUEST,
            )

# Forgot API
class ForgotAPI(generics.GenericAPIView):

    # reference serializer
    serializer_class = ForgotSerializer

    def post(self, request, *args, **kwargs):
        
        # initialize logger
        logger = logging.getLogger(__name__)
        
        # send data to serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # the serializer returns the email address if it exists
        validated_email = serializer.validated_data

        # create a temporary password
        generated_password = ""

        # add 10 random digits to the password
        for x in range(10):
            random_number = random.randint(0, 9)
            generated_password = generated_password + str(random_number)

        # update user password to the newly generated one and retrieve username
        u = User.objects.get(email=validated_email)
        u.set_password(generated_password)
        u.save()
        retrieved_username = u.username
        
        # send a new password to the email address
        message = Mail(
            from_email='privy_support@protonmail.com',
            to_emails=validated_email,
            subject='Forgot Password',
            html_content='Here is your username: ' + retrieved_username + 
            '<br>Here is your temporary password: ' + generated_password)
        try:
            sg = SendGridAPIClient('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')
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
            logger.error("sent email to " + str(validated_email))
        except Exception as e:
            logger.error("ERROR SENDING EMAIL:  " + str(e))

        # return an OK response
        return Response(status=status.HTTP_200_OK)

# Friend Request API
class FriendRequestAPI(generics.GenericAPIView):

    # reference serializer
    serializer_class = FriendRequestSerializer

    def post(self, request, *args, **kwargs):
        
        # send data to serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # create friend object
        serializer.save()

        # return an OK response
        return Response(status=status.HTTP_200_OK)

#UserPost POST API 
class UserPostCreateAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserPostSerializer


    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        parser_classes = (JSONParser, FormParser, MultiPartParser, FileUploadParser)
        userPost = serializer.save()

        

        return Response(
            {
                "userPost": UserPostSerializer(
                    userPost, context=self.get_serializer_context()
                ).data,
            }
        )

    

#UserPost GET request 
#Used for getting all posts from a user through the URL
class UserPostGetAPI(generics.ListAPIView):
    
    serializer_class = UserPostSerializer
    
    def get_queryset(self):
        user = User.objects.get(username=self.kwargs['username'])
        return UserPost.objects.filter(author=user).order_by('-id')

#Used for getting all posts from a given users friends + their own
class UserPostGetFriendsAPI(generics.ListAPIView):
    
    serializer_class = UserPostSerializer
    
    def get_queryset(self):
        #Getting current user's posts
        user = User.objects.get(username=self.kwargs['username'])
        userposts = UserPost.objects.filter(author=user)

        #Get list of friends of the current user
        friendlist = Friend.objects.filter(sender_friend = self.kwargs['username']) 

        #Empty query set
        userFriends = User.objects.filter(username='')

        #For each Friend in the list of friend, search users with the same name
        #append it to userFriends
        for x in friendlist:
            userFriends = userFriends | User.objects.filter(username=x.receiver_friend)

        #For every user in userFriends
        for x in userFriends:
            #Get all of their posts, add them to the list
            userposts = userposts | UserPost.objects.filter(author=x)


        return userposts.order_by('-id')

# UserPostUpdate PUT request
class UserPostUpdateAPI(generics.GenericAPIView, UpdateModelMixin):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = UserPost.objects.all()
    serializer_class = UserPostSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

#UserPost Comment Creation POST API
class UserPostCommentAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserPostCommentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        userComment = serializer.save()

        return Response(
            {
                "id": userComment.id,
                "author": UserSerializer(userComment.author).data,
                "postId": request.data["postId"],
                "comment": userComment.comment
            }
        )

# UserPost Like POST API
class UserPostLikeAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def post(self, request, *args, **kwargs):
        userId = request.data["userId"]
        postId = request.data["postId"]

        user = User.objects.get(id=userId)
        post = UserPost.objects.get(id=postId)

        try:
            post.usersLiked.add(user)
            post.likesCount += 1
        except:
            post.usersLiked.remove(user)
            post.likesCount -= 1

        post.save()
        return Response(
            {
                "post": UserPostSerializer(post).data
            }
        )


#PrivacySettings POST request
class UserPrivacySettings(generics.GenericAPIView):
    serializer_class = UserPrivacySerializer

    def switch_privacy(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        return User.objects.get(username = self.request.user.username)
        
# Get User API
class GetUserProfileAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get(self, request, **kwargs):
        username = kwargs.get('username')
        user = User.objects.get(username=username)
        return Response({
            "user": UserSerializer(user).data
        })

# POST Update User Profile Picture
class UpdateProfilePictureAPI(generics.GenericAPIView):
    permission_classes= [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        try:
            newPicture = self.request.data['image']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        user = self.request.user

        try:
            profile = user.profile
        except:
            profile = UserProfile.objects.create(user=user)

        profile.profile_picture = newPicture
        profile.save()
        return Response(UserProfileSerializer(profile, context=self.get_serializer_context()).data)

# Get Page API
class PageAPI(generics.GenericAPIView):
    # This permission class allows public access to GET requests but
    # only authenticated access to POST requests
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = PageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        page = serializer.save()

        return Response(serializer.data)

    def get(self, request, **kwargs):
        page_id = kwargs.get('page_id')
        page = Page.objects.get(id=page_id)
        return Response(PageSerializer(page).data)

# Subscribe to Page API
class TogglePageSubscriptionAPI(generics.GenericAPIView):
    def get(self, request, **kwargs):
        user = self.request.user
        page = Page.objects.get(id=kwargs.get('page_id'))
        if page in user.subscribed_pages.all():
            user.subscribed_pages.remove(page)
            return Response("unsubscribed")
        else:
            user.subscribed_pages.add(page)
            return Response("subscribed")

class GetUserPagesAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TinyPageSerializer

    def get_queryset(self):
        user = self.request.user
        pages_owned = user.owned_pages.all()
        subscribed_pages = user.subscribed_pages.all()
        return (pages_owned | subscribed_pages)
##############################################################
#SEARCH APIS

#Used for getting the profile of people based on a search
#Based on username
class UserSearchAPI(generics.ListAPIView):
    
    queryset = User.objects.all()
    search_fields = ['username', 'email']
    filter_backends = (filters.SearchFilter,)
    serializer_class = UserSerializer

#Used for getting the profile of players based on a search
#Based on Friends of Friends' names
class UserSearchFOFAPI(generics.ListAPIView):

    serializer_class = UserSerializer
    
    def get_queryset(self):
        #Get list of friends of the current user
        friendlist = Friend.objects.filter(sender_friend = self.request.user.username) 

        #Empty set used for appending
        FoF = Friend.objects.filter(sender_friend='')

        #For each Friend in the list of friend, search users with the same name
        #append it to userFriends
        for x in friendlist:
            FoF = FoF | Friend.objects.filter(sender_friend=x.receiver_friend)

        #Empty set used for appending
        friendsOfFriendsUsers = User.objects.filter(username='')

        #Finding the users of all of the people
        for x in FoF:
            friendsOfFriendsUsers = friendsOfFriendsUsers | User.objects.filter(username=x.receiver_friend)

        return friendsOfFriendsUsers.filter(username__contains=self.kwargs['username'])
        
#Used for getting the posts containing the query
#Based on email
class UserSearchPostsAPI(generics.ListAPIView):
    
    queryset = UserPost.objects.all()
    search_fields = ['description']
    filter_backends = (filters.SearchFilter,)
    serializer_class = UserPostSerializer

#Used for getting the pages based on a search
#Based on title, description, or owner
class UserSearchPagesAPI(generics.ListAPIView):
    
    queryset = Page.objects.all()
    search_fields = ['title', 'description', 'owner__username']
    filter_backends = (filters.SearchFilter,)
    serializer_class = PageSerializer

##################################################################
# USER SETTINGS : Only a PUT request is needed (to update the model). We use a GET request for other users when viewing the user's profile
##################################################################
class UserSettingsUpdateAPI(generics.GenericAPIView, UpdateModelMixin):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSettingsSerializer

    def put(self, request, *args, **kwargs):
        user = request.user
        user_settings = UserSettings.objects.get(user=user)
        user_settings.show_email_on_profile = request.data['show_email_on_profile']
        user_settings.dark_mode = request.data['dark_mode']
        user_settings.save()
        return Response(UserSerializer(user).data)

