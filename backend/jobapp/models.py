from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=30)
    firebase_uid = models.CharField(max_length=50,default="xxxxx")


class Friendlist(models.Model):
    user1 = models.ForeignKey(User,on_delete=models.CASCADE, related_name='sent_friendship')
    user2 = models.ForeignKey(User,on_delete=models.CASCADE, related_name='received_friendship')
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
    ], default='pending')

class Joblinks(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='joblinks')
    job_link = models.CharField(max_length=200)