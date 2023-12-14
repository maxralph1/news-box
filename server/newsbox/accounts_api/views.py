from datetime import datetime
from django.http import Http404
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from posts.models import User
from .serializers import UserSerializer
# from .permissions import IsOwnerOrReadOnly


class UserList(APIView):
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'post': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }

    # List all users, or create a new user.
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'put': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
        'delete': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }
    
    def get_object(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, username, format=None):
        user = self.get_object(username)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    def put(self, request, username, format=None):
        user = self.get_object(username)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username, format=None):
        user = self.get_object(username)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class UserSoftDeleteOrReactivate(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser, )
  
    def get_object(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            raise Http404
    
    def put(self, request, username, format=None):
        user = self.get_object(username)

        if user.is_active:
            user.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif user.is_active == False:
            user.reactivate()
            data = f"You have successfully reactivated the user {user.title}"
            return Response({'response': data}, status=status.HTTP_200_OK)