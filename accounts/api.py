from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ForgotSerializer
import logging
import random

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

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
        
        # send a new password to the email address
        message = Mail(
            from_email='privy_support@protonmail.com',
            to_emails=validated_email,
            subject='Forgot Password',
            html_content='Here is your temporary password:<br>' + generated_password)
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