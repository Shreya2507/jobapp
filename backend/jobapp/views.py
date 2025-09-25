from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.generics import ListCreateAPIView


class UserView(APIView):
    serializer_class = UserSerializer

    def get(self,request,uid):
        users = get_object_or_404(User.objects.select_related().prefetch_related('joblinks','sent_friendship__user2','sent_friendship__user2__joblinks'),firebase_uid=uid)
        serializer = UserSerializer(users)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
    def delete(self,request,uid):
        user = get_object_or_404(User,firebase_uid=uid)
        user.delete()
        return Response(
            {"message": f"User {uid} deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
        
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
    def delete(self,request,j_id):
        job_link = get_object_or_404(Joblinks,id=j_id)
        job_link.delete()
        return Response(
            {"message": f"Job link {j_id} deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )
    def patch(self, request, j_id):
        job_link = get_object_or_404(Joblinks, id=j_id)
        serializer = JoblinksSerializer(job_link, data=request.data, partial=True)  # partial update
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

class FriendlistView(APIView):
    serializer_class = FriendlistSerializer

    def get(self, request, uid):
        # uid here is firebase_uid, not numeric id
        user = get_object_or_404(User, firebase_uid=uid)
        friends = Friendlist.objects.filter(
            Q(user1=user) | Q(user2=user)
        )
        serializer = AllFriendsSerializer(friends, many=True,context={"current_user":user})
        return Response(serializer.data)

    def post(self, request, uid):
        # current user (accepting request)
        user = get_object_or_404(User, firebase_uid=uid)
        user2_id = request.data.get("user2")

        if not user2_id:
            return Response({"error": "user2 is required"}, status=status.HTTP_400_BAD_REQUEST)

        # make sure user2 exists
        user2 = get_object_or_404(User, id=user2_id)

        # Find the friend request where user2 had sent a request to this user
        friendship = Friendlist.objects.filter(
            Q(user1=user2, user2=user, status="pending")
        ).first()

        if not friendship:
            return Response({"error": "No pending friend request found"}, status=status.HTTP_400_BAD_REQUEST)

        # Accept the request
        friendship.status = "accepted"
        friendship.save()

        serializer = FriendlistSerializer(friendship)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PeoplelistView(APIView):

    def get_serializer_class(self):
        if self.request.method == "GET":
            return AllFriendsSerializer
        return FriendRequestSerializer

    def get(self, request, uid):
        # exclude by firebase_uid
        user = get_object_or_404(User, firebase_uid=uid)
        friendships = Friendlist.objects.filter(Q(user1=user) | Q(user2=user))

        serializer = AllFriendsSerializer(friendships,many=True,context={"current_user": user})
        users = User.objects.exclude(id=user.id)
        user_serializer = AllUserSerializer(users,many=True)
        response = {
            "id": user.id,
            "firebase_uid": user.firebase_uid,
            "username": user.username,
            "friends": serializer.data,
            "all_users": user_serializer.data
        }
        return Response(response)

    def post(self, request, uid):
        serializer = FriendRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user1 = get_object_or_404(User, firebase_uid=uid)
        user2_id = serializer.validated_data["user2"]

        if user2_id == user1.id:
            return Response({"error": "Cannot send a friend request to yourself"}, status=status.HTTP_400_BAD_REQUEST)

        user2 = get_object_or_404(User, id=user2_id)

        exists = Friendlist.objects.filter(
            Q(user1=user1, user2=user2) | Q(user1=user2, user2=user1)
        ).exists()
        if exists:
            return Response({"error": "Friend request already exists"}, status=status.HTTP_400_BAD_REQUEST)

        friendship = Friendlist.objects.create(user1=user1, user2=user2, status='pending')
        serializer = FriendlistSerializer(friendship)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
