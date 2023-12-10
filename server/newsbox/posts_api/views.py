from datetime import datetime
from django.http import Http404
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from posts.models import Category, SubCategory, Article, Comment, Like
# from .serializers import CategorySerializer, SubCategorySerializer
from .serializers import CategorySerializer, SubCategorySerializer, ArticleSerializer, CommentSerializer, LikeSerializer
from .permissions import IsOwnerOrReadOnly


# @api_view(['GET', 'POST'])
# def category_list(request):
#     # List all categories, or create a new category.
#     if request.method == 'GET':
#         categories = Category.objects.all()
#         serializer = CategorySerializer(categories, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = CategorySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(added_by=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     # def perform_create(self, serializer):
#     #     serializer.save(added_by=self.request.user)



# @api_view(['GET', 'PUT', 'DELETE'])
# def category_detail(request, pk):
#     # Retrieve, update or delete a category.
#     try:
#         category = Category.objects.get(pk=pk)
#     except Category.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = CategorySerializer(category)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = CategorySerializer(category, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         category.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
    

'''
CATEGORY SECTION
'''

class CategoryList(APIView):
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'post': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }

    # List all categories, or create a new category.
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'put': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
        'delete': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }
    
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class CategorySoftDeleteOrReactivate(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser, )
  
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        category = self.get_object(pk)

        if category.is_active:
            category.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif category.is_active == False:
            category.reactivate()
            data = f"You have successfully reactivated the category {category.title}"
            return Response({'response': data}, status=status.HTTP_200_OK)



'''
SUB-CATEGORY SECTION
'''
class SubCategoryList(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    # List all sub-categories, or create a new category.
    def get(self, request, format=None):
        sub_categories = SubCategory.objects.all()
        serializer = SubCategorySerializer(sub_categories, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        
        serializer = SubCategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubCategoryDetail(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'put': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
        'delete': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }
    
    def get_object(self, pk):
        try:
            return SubCategory.objects.get(pk=pk)
        except SubCategory.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        sub_category = self.get_object(pk)
        serializer = SubCategorySerializer(sub_category)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        sub_category = self.get_object(pk)
        serializer = SubCategorySerializer(sub_category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        sub_category = self.get_object(pk)
        sub_category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class SubCategorySoftDeleteOrReactivate(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser, )
  
    def get_object(self, pk):
        try:
            return SubCategory.objects.get(pk=pk)
        except SubCategory.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        sub_category = self.get_object(pk)

        if sub_category.is_active:
            sub_category.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif sub_category.is_active == False:
            sub_category.reactivate()
            data = f"You have successfully reactivated the sub-category {sub_category.title}"
            return Response({'response': data}, status=status.HTTP_200_OK)



'''
ARTICLE SECTION
'''
class ArticleList(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    # List all articles, or create a new article.
    def get(self, request, format=None):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ArticleDetail(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'put': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
        'delete': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }
    
    def get_object(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except Article.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        article = self.get_object(pk)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        article = self.get_object(pk)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ArticleSoftDeleteOrReactivate(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser, )
  
    def get_object(self, pk):
        try:
            return Article.objects.get(pk=pk)
        except Article.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        article = self.get_object(pk)

        if article.is_active:
            article.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif article.is_active == False:
            article.reactivate()
            data = f"You have successfully reactivated the article {article.title}"
            return Response({'response': data}, status=status.HTTP_200_OK)

    
class ArticleCommentsList(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    # List all comments belonging to an article.
    def get(self, request, article_slug, format=None):
        comments = Comment.objects.all(article__slug=slug, is_active=True)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    

# class ArticleLikesList(APIView):
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

#     # List all likes belonging to an article.
#     def get(self, request, article_slug, format=None):
#         likes = Like.objects.all(article__slug=slug, is_active=True)
#         serializer = LikeSerializer(likes, many=True)
#         return Response(serializer.data)



'''
COMMENT SECTION
'''
class CommentList(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    permission_classes_by_action = {
        'get': (permissions.IsAdminUser, ),
        'post': (permissions.IsAuthenticated, ),
    }

    # List all comments, or create a new comment.
    def get(self, request, format=None):
        comments = Comment.objects.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CommentDetail(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'put': (permissions.IsAuthenticated, ),
        'delete': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }
    
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        comment = self.get_object(pk)
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        comment = self.get_object(pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentSoftDeleteOrReactivate(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser, )
  
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        comment = self.get_object(pk)

        if comment.is_active:
            comment.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif comment.is_active == False:
            comment.reactivate()
            data = f"You have successfully reactivated the comment {comment.title}"
            return Response({'response': data}, status=status.HTTP_200_OK)



'''
LIKE SECTION
'''
class LikeList(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'post': (permissions.IsAuthenticated, ),
    }

    # List all likes, or create a new like.
    def get(self, request, format=None):
        likes = Like.objects.all()
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeDetail(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'delete': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }
    
    def get_object(self, pk):
        try:
            return Like.objects.get(pk=pk)
        except Like.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        like = self.get_object(pk)
        serializer = LikeSerializer(like)
        return Response(serializer.data)

    def delete(self, request, pk, format=None):
        like = self.get_object(pk)
        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



