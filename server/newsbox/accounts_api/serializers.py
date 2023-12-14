from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import User
# from django.contrib.auth.models import User
from posts.models import Category, SubCategory, Article, Comment, Like

    

class UserSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    sub_categories = serializers.PrimaryKeyRelatedField(many=True, queryset=SubCategory.objects.all())
    articles = serializers.PrimaryKeyRelatedField(many=True, queryset=Article.objects.all())
    comments = serializers.PrimaryKeyRelatedField(many=True, queryset=Comment.objects.all())
    likes = serializers.PrimaryKeyRelatedField(many=True, queryset=Like.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'categories', 'sub_categories', 'articles', 'comments', 'likes']
