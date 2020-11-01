from django.contrib.auth import authenticate
from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import User
from .models import UserPost
from .models import Friend
import logging

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    username= serializers.CharField(required=False)
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

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

# Friend Request Serializer
class FriendRequestSerializer(serializers.Serializer):

    # grab the user input
    username = serializers.CharField()
    friendUsername = serializers.CharField()

    logger = logging.getLogger(__name__)

    class Meta:
        model = Friend
        fields = (
            'receiver_friend',
            'sender_friend'
        )

    def create(self, data):
        logger = logging.getLogger(__name__)
        logger.error("IN CREATE")
        friend = Friend.objects.create(
            #receiver_friend = 'ExampleMatt',
            receiver_friend = data.get('friendUsername'),
            #sender_friend = 'ExampleSarah'
            sender_friend = data.get('username')
            )

        logger = logging.getLogger(__name__)
        logger.error(friend.sender_friend + " --> " + friend.receiver_friend)
        
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
    author = serializers.CharField(source='author.username', read_only=True)
    usersLiked = UserSerializer(many=True, required=False)

    class Meta:
        model = UserPost
        fields = (
            'author',
            'id',
            'description',
            'likesCount',
            'usersLiked'
        )  

    def create(self, validated_data):
        userPost = UserPost.objects.create(
            author = self.context['request'].user, title = None, description = validated_data["description"])

        return userPost

    # Need custom update function since default does not support nested (many to many) objects
    # For this to work, the entire UserPost object is needed otherwise data may be lost
    def update(self, instance, validated_data):
        instance.description = validated_data.get("description", instance.description)
        instance.likesCount = validated_data.get("likesCount", instance.likesCount)

        newUsersLiked = validated_data.get("usersLiked")
        instance.usersLiked.clear()
        for user in newUsersLiked:
            user_id = user.get('id')
            user = User.objects.get(id=user_id)
            if not instance.usersLiked.filter(id=user.id).exists():
                instance.usersLiked.add(user)
        
        instance.save()
        return instance
