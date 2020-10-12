from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import User
from django.contrib.auth import authenticate
import logging

# User Serializer
class UserSerializer(serializers.ModelSerializer):
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

# Forgot Serializer
class ForgotSerializer(serializers.Serializer):
    #logger = logging.getLogger(__name__)
    #logger.error(User.objects.all())
    
    email = serializers.CharField()
    #logger.error(User.email)

    def validate(self, data):
        logger = logging.getLogger(__name__)
        logger.error(data.get('email'))
        users = User.objects.all()
        for user in users:
            logger.error(user.email)
    #    if User.objects.filter(email = data.email).exists():
    #        return True
    #    else:
    #        raise serializers.ValidationError("Incorrect Credentials")
