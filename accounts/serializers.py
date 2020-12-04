from .models import User, UserPost, UserPostComment
from django.contrib.auth import authenticate
from rest_framework import serializers

from .models import (User, 
                                    UserPost, 
                                    UserPostComment,
                                    Friend,
                                    Page,
                                    Message,
                                    Conversation)
import logging
from django import forms

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    username= serializers.CharField(required=False)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'date_joined')
        slug_field = 'username'

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])

        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

# OAuth Social Login Serializer
class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token.
    """
    access_token = serializers.CharField(
        allow_blank=False,
        trim_whitespace=True,
    )

# Forgot Serializer
class ForgotSerializer(serializers.Serializer):

    # grab the user input
    email = serializers.CharField()

    def validate(self, data):

        # retrieve all registered users
        users = User.objects.all()

        # if there us a matching email, return it
        for user in users:
            if data.get('email') == user.email:
                return data.get('email')

        # otherwise raise an error
        raise serializers.ValidationError(
            "Email not associted with any account")

# User Comment Serializer
class UserPostCommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField()
    author = serializers.SlugRelatedField(read_only=True, slug_field="username")
    authorId = serializers.IntegerField(write_only=True)
    postId = serializers.IntegerField(write_only=True)

    class Meta:
        model = UserPostComment
        fields = (
            'id',
            'author',
            'comment',
            'postId',
            'authorId'
        )

    def create(self, validated_data):
        relatedPost = UserPost.objects.get(id=validated_data.get("postId"))
        comment = UserPostComment.objects.create(
            author=self.context['request'].user, relatedPost=relatedPost, comment=validated_data.get(
                "comment")
        )
        return comment
        
# Friend Request Serializer
class FriendRequestSerializer(serializers.Serializer):

    # grab the user input
    username = serializers.CharField()
    friendUsername = serializers.CharField()

    # access friend class
    class Meta:
        model = Friend
        fields = (
            'receiver_friend',
            'sender_friend'
        )

    # this happens when you save a frined
    def create(self, data):
        
        # create object
        friend = Friend.objects.create(
            receiver_friend = data.get('friendUsername'),
            sender_friend = data.get('username')
            )

        # log friendship
        logger = logging.getLogger(__name__)
        logger.error("NEW FRIENDSHIP: " + friend.sender_friend + " --> " + friend.receiver_friend)
        
        # return object
        return friend

    
    def validate(self, data):

        # retrieve all registered users
        users = User.objects.all()

        # make sure there is a matching username
        logger = logging.getLogger(__name__)
        logger.error(data.get('friendUsername'))
        for user in users:
            if data.get('friendUsername') == user.username:
                return data

        # otherwise raise an error
        raise serializers.ValidationError(
            "Username not associated with any account")

#User Post Serializer
class UserPostSerializer(serializers.ModelSerializer):
    likesCount = serializers.IntegerField(required=False)
    description = serializers.CharField()
    image = forms.FileField(widget=forms.FileInput(attrs={'accept':'image/*,video/*'}), required=False)  #serializers.ImageField(required=False)
    author = serializers.CharField(source='author.username', read_only=True)
    # usersLiked = UserSerializer(many=True, required=False)
    usersLiked = serializers.SlugRelatedField(many=True, read_only=True, slug_field="username")
    comments = UserPostCommentSerializer(many=True, required=False)
    pageId = serializers.IntegerField(write_only=True, required=False)
    page = serializers.SlugRelatedField(read_only=True, slug_field="id")

    class Meta:
        model = UserPost
        fields = (
            'id',
            'author',
            'image',
            'description',
            'likesCount',
            'usersLiked',
            "comments",
            "page",
            "pageId"
        )  

    def create(self, validated_data):
        try:
            page = None
            if "pageId" in validated_data:
                page = Page.objects.get(id=validated_data["pageId"])
            userPost = UserPost.objects.create(
                author = self.context['request'].user, image = validated_data["image"], title = None, description = validated_data["description"], page=page)
        except KeyError as e:
            page = None
            if "pageId" in validated_data:
                page = Page.objects.get(id=validated_data["pageId"])
            logger = logging.getLogger(__name__)
            logger.error("No image uploaded with post")
            userPost = UserPost.objects.create(
                author=self.context['request'].user, title=None, description=validated_data["description"], page=page)


        return userPost

    # Need custom update function since default does not support nested (many to many) objects
    # For this to work, the entire UserPost object is needed otherwise data may be lost
    # def update(self, instance, validated_data):
    #     instance.description = validated_data.get("description", instance.description)
    #     instance.likesCount = validated_data.get("likesCount", instance.likesCount)

    #     newUsersLiked = validated_data.get("usersLiked")
    #     instance.usersLiked.clear()
    #     for user in newUsersLiked:
    #         user_id = user.get('id')
    #         user = User.objects.get(id=user_id)
    #         if not instance.usersLiked.filter(id=user.id).exists():
    #             instance.usersLiked.add(user)
        
    #     instance.save()
    #     return instance

    #User Privacy Serializer

class PageSerializer(serializers.ModelSerializer):
    members = serializers.SlugRelatedField(
        read_only=True, slug_field="username", many=True
    )
    owner = serializers.SlugRelatedField(
        read_only=True, slug_field="username")

    # Request data
    title = serializers.CharField()
    description = serializers.CharField()
    posts = UserPostSerializer(many=True, read_only=True)
    
    class Meta:
        model = Page
        fields = (
            'id',
            'title',
            'owner',
            'description',
            'posts',
            'date_created',
            'members'
        )
        read_only_fields = ['date_created', 'members', 'posts']

    def create(self, validated_data):
        page = Page.objects.create(owner=self.context['request'].user, title=validated_data['title'], description=validated_data['description'])
        return page

class UserPrivacySerializer(serializers.Serializer):
    def setPrivacy(self):
        user = User.objects.get(username=self.request.user.username)
        if user.privFlag:
            user.privFlag = False
        else:
            user.privFlag = True

        return user.privFlag

#Message serializer
class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(source='sender.username', read_only=True)
    messageContent = serializers.CharField()
    

    class Meta:
        model = Message
        fields = (
            'sender',
            'messageContent'
        )
        read_only_fields = ['sender']

    def create(self, validated_data):
        msg = Message.objects.create(
            sender = self.request.user, messageContent = validated_data["messageContent"])
        return msg

#Conversation Serializer
class ConversationSerializer(serializers.ModelSerializer):

    members = serializers.SlugRelatedField(
        read_only=True, slug_field="username", many=True
    )
    messages = MessageSerializer(many=True)
    read = serializers.BooleanField()

    class Meta:
        model = Conversation
        fields = (
            'id',
            'members',
            'messages',
            'read'
        )

    def create(self, validated_data):
        convo = Conversation.objects.create(
            members = validated_data["members"], messages = validated_data["messages"])
        return convo