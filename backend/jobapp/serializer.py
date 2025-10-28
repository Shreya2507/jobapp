from rest_framework import serializers
from .models import *

class JoblinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Joblinks
        fields = ['id', 'user', 'job_link']

class FriendlistSerializer(serializers.ModelSerializer):
    from_user_name = serializers.CharField(source='user1.username', read_only=True)
    from_user_firebase_uid = serializers.CharField(source='user1.firebase_uid', read_only=True)
    to_user_name = serializers.CharField(source='user2.username', read_only=True)
    to_user_firebase_uid = serializers.CharField(source='user2.firebase_uid', read_only=True)
    # friend_joblinks_set = JoblinksSerializer(source = 'user2.joblinks',many=True, read_only=True)
    class Meta:
        model = Friendlist
        fields = ['id','user1','user2','from_user_name','from_user_firebase_uid','to_user_firebase_uid','to_user_name','status','friend_joblinks_set']

class SentFriendlistSerializer(FriendlistSerializer):
    friend_joblinks_set = JoblinksSerializer(source='user2.joblinks', many=True, read_only=True)

class ReceivedFriendlistSerializer(FriendlistSerializer):
    friend_joblinks_set = JoblinksSerializer(source='user1.joblinks', many=True, read_only=True)


class UserSerializer(serializers.ModelSerializer):
    joblinks_set = JoblinksSerializer(source='joblinks', many=True, read_only=True)
    sent_friendlist_set = SentFriendlistSerializer(source='sent_friendship', many=True, read_only=True)
    received_friendlist_set = ReceivedFriendlistSerializer(source='received_friendship', many=True, read_only=True)


    class Meta:
        model = User
        fields = ['id','firebase_uid', 'username', 'joblinks_set','sent_friendlist_set','received_friendlist_set']


class AllFriendsSerializer(serializers.ModelSerializer):
    friend_id = serializers.SerializerMethodField()
    friend_firebase_uid = serializers.SerializerMethodField()
    friend_username = serializers.SerializerMethodField()
    friendship_sent_or_received = serializers.SerializerMethodField()

    class Meta:
        model = Friendlist
        fields = ['friend_id', 'friend_firebase_uid', 'friend_username','status','friendship_sent_or_received']
    
    def get_friend_id(self, obj):
        current_user = self.context.get("current_user")
        return obj.user2.id if obj.user1 == current_user else obj.user1.id
    
    def get_friend_firebase_uid(self,obj):
        current_user = self.context.get("current_user")
        return obj.user2.firebase_uid if obj.user1 == current_user else obj.user1.firebase_uid
    
    def get_friend_username(self, obj):
        current_user = self.context.get("current_user")
        return obj.user2.username if obj.user1 == current_user else obj.user1.username
    
    def get_friendship_sent_or_received(self, obj):
        current_user = self.context.get("current_user")
        return "Sent" if obj.user1 == current_user else "Received"

class AllUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','firebase_uid', 'username']

class FriendRequestSerializer(serializers.Serializer):
    user2 = serializers.IntegerField()