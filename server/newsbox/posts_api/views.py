from datetime import datetime
from django.db import transaction
from django.http import Http404
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from posts.models import Category, SubCategory, Article, Comment, CommentReply, Like 
from .serializers import CategorySerializer, SubCategorySerializer, ArticleSerializer, CommentSerializer, CommentReplySerializer, LikeSerializer, CategoryExplicitSerializer, SubCategoryExplicitSerializer, ArticleExplicitSerializer
from .permissions import IsOwnerOrReadOnly



'''
CATEGORY SECTION
'''

class CategoryList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    # permission_classes = [CustomPermissionClass]

    # List all categories, or create a new category.
    def get(self, request, format=None):
        categories = Category.objects.filter(is_active=True).order_by('-created_at')
        serializer = CategoryExplicitSerializer(categories, many=True)
        return Response(serializer.data)
    

    def post(self, request, format=None):
        categories_count = Category.objects.all().count()

        # Limit categories to a maximum of 10
        if categories_count >= 10:
            data = f"The maximum allowed number of categories is 10. You must remove an old one to add a new one."
            return Response({'response': data}, status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = CategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(added_by=self.request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk, is_active=True)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategoryExplicitSerializer(category)
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
        SubCategory.objects.filter(category__pk=pk).delete()
        Article.objects.filter(category__pk=pk).delete()
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
        sub_categories = SubCategory.objects.filter(is_active=True).order_by('-created_at')
        serializer = SubCategoryExplicitSerializer(sub_categories, many=True)
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
            return SubCategory.objects.get(pk=pk, is_active=True)
        except SubCategory.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        sub_category = self.get_object(pk)
        serializer = SubCategoryExplicitSerializer(sub_category)
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
        Article.objects.filter(sub_category__pk=pk).delete()
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
        articles = Article.objects.filter(is_active=True).order_by('-created_at')
        serializer = ArticleExplicitSerializer(articles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
'''
For Infinite Scroll for Articles
'''
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    # page_size_query_param = 'page_size'
    # max_page_size = 1000

class ArticleListPaginated(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    pagination_class = StandardResultsSetPagination

    # List all articles, or create a new article.
    def get(self, request, format=None):
        articles = Article.objects.filter(is_active=True).order_by('-created_at')
        serializer = ArticleExplicitSerializer(articles, many=True)
        return Response(serializer.data)

class ArticleListForCategoryPaginated(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    pagination_class = StandardResultsSetPagination

    # List all articles, or create a new article.
    def get(self, request, category_pk, format=None):
        articles = Article.objects.filter(category=category_pk, is_active=True).order_by('-created_at')
        serializer = ArticleExplicitSerializer(articles, many=True)
        return Response(serializer.data)

class ArticleListForSubCategoryPaginated(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    pagination_class = StandardResultsSetPagination

    # List all articles, or create a new article.
    def get(self, request, sub_category_pk, format=None):
        articles = Article.objects.filter(sub_category=sub_category_pk, is_active=True).order_by('-created_at')
        serializer = ArticleExplicitSerializer(articles, many=True)
        return Response(serializer.data)
    
'''
End of Infinite Scroll for Articles
'''


class ArticleDetail(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'put': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
        'delete': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }
    
    def get_object(self, pk):
        try:
            return Article.objects.get(pk=pk, is_active=True)
        except Article.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        article = self.get_object(pk)
        serializer = ArticleExplicitSerializer(article)
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
        Comment.objects.filter(article__pk=pk).delete()
        Like.objects.filter(article__pk=pk).delete()
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ArticleSoftDeleteOrReactivate(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser, )
  
    def get_object(self, pk):
        try:
            return Article.objects.get(pk=pk, is_active=True)
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
        

# @transaction.atomic
class ArticleSetAsFeatured(APIView):
    permission_classes = (permissions.IsAdminUser, )

    with transaction.atomic():
        # Article.objects.filter(is_featured=True).update(is_featured=False)

        def get_object(self, pk):
            try:
                return Article.objects.get(pk=pk, is_active=True)
            except Article.DoesNotExist:
                raise Http404
            
        def put(self, request, pk, format=None):
            article = self.get_object(pk)

            if article.is_featured == False:
                Article.objects.filter(is_featured=True).update(is_featured=False)
                Article.objects.filter(pk=pk).update(is_featured=True)
                # article.update(is_featured=True)
                serializer = ArticleSerializer(article)
                return Response(serializer.data)
        

class ArticleSetAsGallery(APIView):
    permission_classes = (permissions.IsAdminUser, )

    def get_object(self, pk):
        try:
            return Article.objects.get(pk=pk, is_active=True)
        except Article.DoesNotExist:
            raise Http404
        
    def put(self, request, pk, format=None):
        article = self.get_object(pk)

        articles_count = Article.objects.filter(is_gallery=True).order_by('-created_at').count()

        if articles_count >= 5:
            data = f"The maximum number of articles in the gallery is 5. You must remove one from the gallery to add a new one."
            return Response({'response': data}, status=status.HTTP_400_BAD_REQUEST)

        elif articles_count < 5:
            article = Article.objects.filter(pk=pk).update(is_gallery=True)
            # article.update(is_gallery=True)
            serializer = ArticleSerializer(article)
            return Response(serializer.data)
        

# # @transaction.atomic
# class ArticleSetAsGalleryCentered(APIView):
#     permission_classes = (permissions.IsAdminUser, )

#     with transaction.atomic():
#         Article.objects.filter(is_gallery=True, is_gallery_centered=True).update(is_gallery_centered=False)

#         def get_object(self, pk):
#             try:
#                 return Article.objects.get(pk=pk)
#             except Article.DoesNotExist:
#                 raise Http404
            
#         def put(self, request, pk, format=None):
#             article = self.get_object(pk)

#             if article.is_gallery == False:
#                 data = f"You should set the article as part of the gallery before you can set it as center article in the gallery."
#                 return Response({'response': data}, status=status.HTTP_400_BAD_REQUEST)

#             if article.is_gallery_centered == False:
#                 article.update(is_gallery_centered=True)
#                 serializer = ArticleSerializer(article)
#                 return Response(serializer.data)
        



# class ArticleCommentsList(APIView):
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

#     # List all comments belonging to an article.
#     def get(self, request, article_slug, format=None):
#         comments = Comment.objects.all(article__slug=article_slug, is_active=True)
#         serializer = CommentSerializer(comments, many=True)
#         return Response(serializer.data)
    

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
        comments = Comment.objects.filter(is_active=True).order_by('-created_at')
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
            return Comment.objects.get(pk=pk, is_active=True)
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
        Like.objects.filter(comment__pk=pk).delete()
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentSoftDeleteOrReactivate(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser, )
  
    def get_object(self, pk):
        try:
            return Comment.objects.get(pk=pk, is_active=True)
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
COMMENT REPLY SECTION
'''
class CommentReplyList(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    permission_classes_by_action = {
        'get': (permissions.IsAdminUser, ),
        'post': (permissions.IsAuthenticated, ),
    }

    # List all comments, or create a new comment reply.
    def get(self, request, format=None):
        comment_replies = CommentReply.objects.filter(is_active=True).order_by('-created_at')
        serializer = CommentReplySerializer(comment_replies, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CommentReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CommentReplyDetail(APIView):
    permission_classes_by_action = {
        'get': (permissions.IsAuthenticatedOrReadOnly, ),
        'put': (permissions.IsAuthenticated, ),
        'delete': (permissions.IsAuthenticated, permissions.IsAdminUser, ),
    }

    def get_object(self, pk):
        try:
            return CommentReply.objects.get(pk=pk, is_active=True)
        except CommentReply.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        comment_reply = self.get_object(pk)
        serializer = CommentReplySerializer(comment_reply)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        comment_reply = self.get_object(pk)
        serializer = CommentReplySerializer(comment_reply, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        comment_reply = self.get_object(pk)
        Like.objects.filter(comment_reply__pk=pk).delete()
        comment_reply.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentReplySoftDeleteOrReactivate(APIView):
    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser, )
  
    def get_object(self, pk):
        try:
            return CommentReply.objects.get(pk=pk, is_active=True)
        except CommentReply.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        comment_reply = self.get_object(pk)

        if comment_reply.is_active:
            comment_reply.deactivate()
            return Response(status=status.HTTP_204_NO_CONTENT)
        elif comment_reply.is_active == False:
            comment_reply.reactivate()
            data = f"You have successfully reactivated the comment {comment_reply.title}"
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
        likes = Like.objects.filter(is_active=True).order_by('-created_at')
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
            return Like.objects.get(pk=pk, is_active=True)
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



# Article Like/Unlike
    
@api_view(['POST'])
def article_like_unlike(request, article):
    """
    Retrieve, add or delete an article like.
    """
    try:
        like = Like.objects.get(article=article, added_by=request.user)
        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Like.DoesNotExist:
        # return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)