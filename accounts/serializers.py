from django.contrib.auth import authenticate
from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import User, UserPost, UserPostComment


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

#User Post Serializer
class UserPostSerializer(serializers.ModelSerializer):
    likesCount = serializers.IntegerField(required=False)
    description = serializers.CharField()
    author = serializers.CharField(source='author.username', read_only=True)
    usersLiked = UserSerializer(many=True, required=False)

    class Meta:
        model = UserPost
        fields = (
            'id',
            'author',
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

# User Comment Serializer
class UserPostCommentSerializer(serializers.ModelSerializer):
    comment = serializers.CharField()
    author = UserSerializer(required=False)
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
            author=self.context['request'].user, relatedPost=relatedPost, comment=validated_data.get("comment")
        )
        return comment
        
