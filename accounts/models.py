from django.contrib.auth.models import AbstractUser
from django.db import models
<<<<<<< HEAD
=======
from django import forms
>>>>>>> f27c589c1cbd6d1c310def4595c3b32027478509
from django.contrib.auth.decorators import login_required

# Create your models here.


# This is the custom user model
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
    image = models.ImageField(
        upload_to='postFile/',
        max_length=254, blank=True, null=True
    )
    #image = forms.ImageField(widget=forms.FileInput(attrs={'accept':'image/*,video/*'}))
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    likesCount = models.IntegerField(default=0)
    usersLiked = models.ManyToManyField(User, related_name="usersLiked")

    def __str__(self):
        """A string representation of the model."""
        return str(self.id)

class UserPostComment(models.Model):
    author = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    relatedPost = models.ForeignKey(UserPost, related_name="comments", on_delete=models.CASCADE)
    comment = models.TextField()
    
    def __str__(self):
        return f'{self.id}'
# class for a relationship betwee 2 users
class Friend(models.Model):
    
    # username of user who is receiving the friend request
    receiver_friend = models.CharField(max_length=250)

    # username of user who is sending the friend request
    sender_friend = models.CharField(max_length=250)
