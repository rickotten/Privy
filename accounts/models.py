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
    likesCount = models.IntegerField(default=0)
    usersLiked = models.ManyToManyField(User, related_name="usersLiked")

    def __str__(self):
        """A string representation of the model."""
        return str(self.id)
<<<<<<< HEAD
=======

class UserPostComment(models.Model):
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    relatedPost = models.ForeignKey(UserPost, related_name="comments", on_delete=models.CASCADE)
    comment = models.TextField()
    
    def __str__(self):
        return f'{self.id}'
>>>>>>> 4a45da7ff011a015c64aed9b85aa2972792cca85
