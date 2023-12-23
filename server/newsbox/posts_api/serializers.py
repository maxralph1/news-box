from rest_framework import serializers
from posts.models import Category, SubCategory, Article, Comment, Like


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

    class Meta:
        model = Article
        fields = ('id', 'category', 'sub_category', 'is_featured', 'is_gallery', 'is_gallery_centered', 'title', 'body', 'image', 'added_by', 'created_at', )

    # def to_representation(self, instance):
    #     data = super().to_representation(instance)
    #     data['category'] = CategorySerializer(Category.objects.get(pk=data['category'])).data
    #     data['sub_category'] = SubCategorySerializer(SubCategory.objects.get(pk=data['sub_category'])).data
    #     return data


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')

    class Meta:
        model = Comment
        fields = ('id', 'article', 'title', 'body', 'added_by', 'is_active')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['article'] = ArticleSerializer(Article.objects.get(pk=data['article'])).data
        return data


class LikeSerializer(serializers.HyperlinkedModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')

    class Meta:
        model = Like
        fields = ('id', 'category', 'sub_category', 'article', 'comment', 'body', 'added_by', 'is_active')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(Category.objects.get(pk=data['category'])).data
        data['sub_category'] = SubCategorySerializer(SubCategory.objects.get(pk=data['sub_category'])).data
        data['article'] = ArticleSerializer(Article.objects.get(pk=data['article'])).data
        data['comment'] = CommentSerializer(Comment.objects.get(pk=data['comment'])).data
        return data
    

# Explicit

class CategoryMainSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    sub_categories = SubCategorySerializer(many=True)
    articles = ArticleSerializer(many=True)
    likes = LikeSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'sub_categories', 'articles', 'likes', 'title', 'description', 'added_by', )

class SubCategoryMainSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    articles = ArticleSerializer(many=True)
    likes = LikeSerializer(many=True)

    class Meta:
        model = SubCategory
        fields = ('id', 'articles', 'likes', 'title', 'description', 'added_by', )

class ArticleMainSerializer(serializers.ModelSerializer):
    added_by = serializers.ReadOnlyField(source='added_by.username')
    likes = LikeSerializer(many=True)

    class Meta:
        model = Article
        fields = ('id', 'likes', 'category', 'sub_category', 'is_featured', 'is_gallery', 'is_gallery_centered', 'title', 'body', 'image', 'added_by', 'is_active', 'created_at', )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = CategorySerializer(Category.objects.get(pk=data['category'])).data
        data['sub_category'] = SubCategorySerializer(SubCategory.objects.get(pk=data['sub_category'])).data
        return data