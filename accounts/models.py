from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

class UserPost(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
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
