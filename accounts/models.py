from django.contrib.auth.models import AbstractUser
from django.db import models
from django import forms

# Create your models here.
class User(AbstractUser):
    pass

class UserPost(models.Model):

    title = models.CharField(max_length=250)
    description = models.TextField()
    image = models.FileField(
        upload_to='postFile/',
        max_length=254, blank=True, null=True
    )
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    likesCount = models.IntegerField(default=0)
    usersLiked = models.ManyToManyField(User, related_name="usersLiked")

    def __str__(self):
        """A string representation of the model."""
        return str(self.id)

# class for a relationship betwee 2 users
class Friend(models.Model):
    
    # username of user who is receiving the friend request
    receiver_friend = models.CharField(max_length=250)

    # username of user who is sending the friend request
    sender_friend = models.CharField(max_length=250)