from sendgrid.helpers.mail import Mail
from sendgrid import SendGridAPIClient
import os
import random
import logging
from django.conf import settings

from rest_framework import generics, permissions, status
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, SocialSerializer, ForgotSerializer, UserPostSerializer, UserPostCommentSerializer
from .models import UserPost, User



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

#UserPost POST API 
class UserPostCreateAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = UserPostSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        userPost = serializer.save()
        
        return Response(
            {
                "userPost": UserPostSerializer(
                    userPost, context=self.get_serializer_context()
                ).data,
            }
        )

#UserPost GET request 
class UserPostGetAPI(generics.ListAPIView):
    
    serializer_class = UserPostSerializer

    def get_queryset(self):
        user = User.objects.get(username=self.request.user.username)
        return UserPost.objects.filter(author=user)

<<<<<<< HEAD


#PrivacySettings POST request
class UserPrivacySettings(generics.GenericAPIView):
    serializer_class = UserPrivacySerializer

    def switch_privacy(self, request, *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        return User.objects.get(username = self.request.user.username)
        
        
=======
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
>>>>>>> 4a45da7ff011a015c64aed9b85aa2972792cca85
