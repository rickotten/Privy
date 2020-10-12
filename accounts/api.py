from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ForgotSerializer
import logging

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
    serializer_class = ForgotSerializer

    def post(self, request, *args, **kwargs):
        logger = logging.getLogger(__name__)
        #logger.error(request.data.email)
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        exists = serializer.validated_data
        logger.error('EXISTS:' + exists)
        
        message = Mail(
            from_email='privy_support@protonmail.com',
            to_emails='dylhamm7@gmail.com',
            subject='Sending with Twilio SendGrid is Fun',
            html_content='<strong>and easy to do anywhere, even with Python</strong>')
        try:
            sg = SendGridAPIClient(os.environ.get('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'))
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            logger.error("HELLO " + str(e))

        return Response(status=status.HTTP_200_OK)