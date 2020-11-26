import django
from django.contrib.auth.models import AbstractUser
from django.db import models
from django import forms
from django.contrib.auth.decorators import login_required

# Create your models here.


# This is the custom user model
class User(AbstractUser):
    privFlag = False

class UserProfile(models.Model):
    user = models.OneToOneField(
        User, related_name="profile", on_delete=models.CASCADE, primary_key=True)
    profile_picture = models.ImageField(
        upload_to='profileFile/',
        max_length=254, blank=True, null=True
    )

class UserSettings(models.Model):
    user = models.OneToOneField(
        User, related_name="settings", on_delete=models.CASCADE, primary_key=True)
    private_profile = models.BooleanField(default=False)
    show_email_on_profile = models.BooleanField(default=True)
    dark_mode = models.BooleanField(default=False)

# Model for user privacy page

class UserPrivacy(User):
    @login_required
    def fetchUserEmail(self):
        if(self.privFlag):
            return self.email
        else:
            return PermissionError

class Page(models.Model):
    title = models.CharField(max_length=250)
    owner = models.ForeignKey(
        User, related_name="owned_pages", on_delete=models.CASCADE)
    description = models.TextField()
    date_created = models.DateTimeField(
        default=django.utils.timezone.now, verbose_name='date created')
    members = models.ManyToManyField(User, related_name="subscribed_pages")

class UserPost(models.Model):

    title = models.CharField(max_length=250)
    description = models.TextField()
    image = models.ImageField(
        upload_to='postFile/',
        max_length=254, blank=True, null=True
    )
    page = models.ForeignKey(Page, related_name="posts", on_delete=models.CASCADE, blank=True, null=True)
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
