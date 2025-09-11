from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=30)

class Joblinks(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    job_link = models.CharField(max_length=200)