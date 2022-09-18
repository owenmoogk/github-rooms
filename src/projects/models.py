from django.db import models
from django.contrib.auth.models import User
from room.models import Room

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=True)
    apiURL = models.CharField(max_length=200)