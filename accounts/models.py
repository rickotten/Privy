from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

class UserPost(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        """A string representation of the model."""
        return str(self.id)


