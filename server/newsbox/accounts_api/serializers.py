from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import User, Profile
# from django.contrib.auth.models import User
from posts.models import Category, SubCategory, Article, Comment, CommentReply, Like

    

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']
    

class ProfileSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    # image = serializers.ImageField(required=False)

    class Meta:
        model = Profile
        fields = ('id', 'bio', 'user', 'created_at', )



class UserSerializer(serializers.ModelSerializer):
    # profile = ProfileSerializer(many=True)
    # profile = serializers.PrimaryKeyRelatedField(many=True, queryset=Profile.objects.all())
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    sub_categories = serializers.PrimaryKeyRelatedField(many=True, queryset=SubCategory.objects.all())
    articles = serializers.PrimaryKeyRelatedField(many=True, queryset=Article.objects.all())
    comments = serializers.PrimaryKeyRelatedField(many=True, queryset=Comment.objects.all())
    comment_replies = serializers.PrimaryKeyRelatedField(many=True, queryset=CommentReply.objects.all())
    likes = serializers.PrimaryKeyRelatedField(many=True, queryset=Like.objects.all())
    image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'image', 'bio', 'created_at', 'role', 'categories', 'sub_categories', 'articles', 'comments', 'comment_replies', 'likes', )
        # fields = ('id', 'username', 'first_name', 'last_name', 'created_at', 'categories', 'sub_categories', 'articles', 'comments', 'likes', 'profile', )
        # fields = ['id', 'username', 'first_name', 'last_name', 'profile', 'categories', 'sub_categories', 'articles', 'comments', 'likes']
