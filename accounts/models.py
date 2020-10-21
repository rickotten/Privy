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


class UserPost(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        """A string representation of the model."""
        return str(self.id)
