from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

# Create your models here.
class User(AbstractUser):
    pass

class CustomBackend(BaseBackend):
    def authenticate(self, request, username=None, email=None, password=None):
        login_valid = (settings.ADMIN_LOGIN == username or settings.ADMIN_LOGIN == email)
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