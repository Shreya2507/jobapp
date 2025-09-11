from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework import status


class UserView(APIView):
    serializer_class = UserSerializer

    def get(self,request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        
class JoblinkView(APIView):
    serializer_class = JoblinksSerializer
    
    def get(self,request):
        joblinks = Joblinks.objects.all()
        serializer = JoblinksSerializer(joblinks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = JoblinksSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)