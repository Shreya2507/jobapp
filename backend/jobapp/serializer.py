from rest_framework import serializers
from .models import *

class JoblinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Joblinks
        fields = ['id', 'user', 'job_link']

class UserSerializer(serializers.ModelSerializer):
    joblinks_set = JoblinksSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'joblinks_set']