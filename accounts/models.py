from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.decorators import login_required

# Create your models here.


# This is the custom user model (needs further developed)
class User(AbstractUser):
    privFlag = False

    


# Model for user privacy page

class UserPrivacy(User):
    @login_required
    def fetchUserEmail(self):
        if(self.privFlag):
            return self.email
        else:
            return PermissionError

# Model for custom backend
'''
class CustomBackend(BaseBackend):
    def authenticate(self, request, username=None, email=None, password=None):
        login_valid = (username.ADMIN_LOGIN == username or settings.ADMIN_LOGIN == email)
        pwd_valid = check_password(password, settings.ADMIN_LOGIN)
        if(login_valid and pwd_valid):
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                user = User(username = username)
                user.is_staff = True
                user.is_supervisor = True
                user.save()
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
            '''