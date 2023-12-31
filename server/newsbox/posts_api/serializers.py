from rest_framework import serializers
from posts.models import Category, SubCategory, Article, Comment, CommentReply, Like 
from accounts.models import User
from accounts_api.serializers import UserDetailSerializer


# class CategorySerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     title = serializers.CharField(required=False, allow_blank=True, max_length=30)
#     description = serializers.CharField(required=False, allow_blank=True, max_length=255)
#     is_active = serializers.BooleanField(required=False)
#     added_by = serializers.ReadOnlyField(source='added_by.username')

#     def create(self, validated_data):
#         return Category.objects.create(**validated_data)

#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.description = validated_data.get('description', instance.description)
#         instance.is_active = validated_data.get( instance.is_active)
#         instance.save()
#         return instance
    


class CategorySerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    # sub_categories = serializers.PrimaryKeyRelatedField(many=True, queryset=SubCategory.objects.all())
    # sub_categories = SubCategorySerializer(many=True)
    # sub_categories = serializers.HyperlinkedRelatedField(
    #     many=True, view_name='sub_categories-detail', read_only=True)
    # sub_categories = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    # sub_categories = serializers.ReadOnlyField(source='sub_categories.title')
    # sub_categories = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='title'
    #  )
    sub_categories = serializers.StringRelatedField(many=True)
    # articles = serializers.PrimaryKeyRelatedField(many=True, queryset=Article.objects.all())
    likes = serializers.PrimaryKeyRelatedField(many=True, queryset=Like.objects.all())

    class Meta:
        model = Category
        fields = ('id', 'sub_categories', 'articles', 'likes', 'title', 'description', 'added_by', )


class SubCategorySerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')

    class Meta:
        model = SubCategory
        fields = ('id', 'category', 'title', 'description', 'added_by',  )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(Category.objects.get(pk=data['category'])).data
        return data
    


class ArticleSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    image = serializers.ImageField(required=False)

    class Meta:
        model = Article
        fields = ('id', 'category', 'sub_category', 'is_featured', 'is_gallery', 'is_gallery_centered', 'title', 'body', 'image', 'image_description', 'added_by', 'created_at', )

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     data['category'] = CategorySerializer(Category.objects.get(pk=data['category'])).data
    #     data['sub_category'] = SubCategorySerializer(SubCategory.objects.get(pk=data['sub_category'])).data
    #     return data



class CommentSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    article = serializers.ReadOnlyField(source='article.title')

    class Meta:
        model = Comment
        fields = ('id', 'article', 'body', 'added_by', 'created_at', )

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     data['article'] = ArticleSerializer(Article.objects.get(pk=data['article'])).data
    #     return data



class CommentReplySerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    comment = serializers.ReadOnlyField(source='comment.body')

    class Meta:
        model = CommentReply
        fields = ('id', 'comment', 'body', 'added_by', 'created_at', )

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     data['comment'] = CommentSerializer(Comment.objects.get(pk=data['comment'])).data
    #     return data


class LikeSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    article = serializers.ReadOnlyField(source='article.title')

    class Meta:
        model = Like
        fields = ('id', 'article', 'added_by', 'created_at', )
        # fields = ('id', 'category', 'sub_category', 'article', 'comment', 'comment_reply', 'added_by', 'is_active')

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     data['category'] = CategorySerializer(Category.objects.get(pk=data['category'])).data
    #     data['sub_category'] = SubCategorySerializer(SubCategory.objects.get(pk=data['sub_category'])).data
    #     data['article'] = ArticleSerializer(Article.objects.get(pk=data['article'])).data
    #     data['comment'] = CommentSerializer(Comment.objects.get(pk=data['comment'])).data
    #     data['comment_reply'] = CommentReplySerializer(CommentReply.objects.get(pk=data['comment_reply'])).data
    #     return data
    

# Explicit

class CategoryExplicitSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    sub_categories = SubCategorySerializer(many=True)
    articles = ArticleSerializer(many=True)
    likes = LikeSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'sub_categories', 'articles', 'likes', 'title', 'description', 'added_by', 'created_at', )

class SubCategoryExplicitSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    category = serializers.ReadOnlyField(source='category.title')
    articles = ArticleSerializer(many=True)
    likes = LikeSerializer(many=True)

    class Meta:
        model = SubCategory
        fields = ('id', 'articles', 'likes', 'title', 'description', 'category', 'added_by', 'created_at', )

class ArticleExplicitSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    comments = CommentSerializer(many=True)
    likes = LikeSerializer(many=True)

    class Meta:
        model = Article
        fields = ('id', 'comments', 'likes', 'category', 'sub_category', 'is_featured', 'is_gallery', 'is_gallery_centered', 'title', 'body', 'image', 'image_description', 'added_by', 'is_active', 'created_at', )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(Category.objects.get(pk=data['category'])).data
        data['sub_category'] = SubCategorySerializer(SubCategory.objects.get(pk=data['sub_category'])).data
        # data['added_by'] = UserDetailSerializer(User.objects.get(pk=data['added_by'])).data
        return data