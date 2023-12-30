from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


app_name = 'posts_api'

urlpatterns = [
    # Categories
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('categories/<int:pk>/soft-delete-or-reactivate/', views.CategorySoftDeleteOrReactivate.as_view()),
    # path('categories/<slug:like_slug>/likes/', views.CategoryLikesList.as_view()),

    # Sub-categories
    path('sub-categories/', views.SubCategoryList.as_view()),
    path('sub-categories/<int:pk>/', views.SubCategoryDetail.as_view()),
    path('sub-categories/<int:pk>/soft-delete-or-reactivate/', views.SubCategorySoftDeleteOrReactivate.as_view()),
    # path('sub-categories/<slug:like_slug>/likes/', views.SubCategoryLikesList.as_view()),

    # # Sub-categories
    # path('categories/<int:category_pk>/sub-categories/', views.SubCategoryList.as_view()),
    # path('categories/<int:category_pk>/sub-categories/<int:pk>/', views.SubCategoryDetail.as_view()),
    # path('categories/<int:category_pk>/sub-categories/<int:pk>/soft-delete-or-reactivate/', views.SubCategorySoftDeleteOrReactivate.as_view()),
    # # path('sub-categories/<slug:like_slug>/likes/', views.SubCategoryLikesList.as_view()),

    # Articles
    path('articles/', views.ArticleList.as_view()),
    path('articles/paginated/', views.ArticleListPaginated.as_view()),
    path('articles/<int:pk>/', views.ArticleDetail.as_view()),
    path('articles/<int:pk>/soft-delete-or-reactivate/', views.ArticleSoftDeleteOrReactivate.as_view()),
    # path('articles/<slug:article_slug>/comments/', views.ArticleCommentsList.as_view()),
    path('articles/<int:pk>/set-as-featured/', views.ArticleSetAsFeatured.as_view()),
    path('articles/<int:pk>/set-as-gallery/', views.ArticleSetAsGallery.as_view()),
    # path('articles/<int:pk>/set-as-gallery-centered/', views.ArticleSetAsGalleryCentered.as_view()),
    # path('articles/<slug:like_slug>/likes/', views.ArticleLikesList.as_view()),
    path('categories/<int:category_pk>/articles/paginated/', views.ArticleListForCategoryPaginated.as_view()),
    path('sub-categories/<int:sub_category_pk>/articles/paginated/', views.ArticleListForSubCategoryPaginated.as_view()),

    # Comments
    path('comments/', views.CommentList.as_view()),
    path('comments/<int:pk>/', views.CommentDetail.as_view()),
    # path('comments/<slug:like_slug>/likes/', views.CommentLikesList.as_view()),

    # Comment Replies
    path('comment-replies/', views.CommentReplyList.as_view()),
    path('comment-replies/<int:pk>/', views.CommentReplyDetail.as_view()),
    # path('comments/<slug:like_slug>/likes/', views.CommentLikesList.as_view()),

    # Likes
    path('likes/', views.LikeList.as_view()),
    path('likes/<int:pk>/', views.LikeDetail.as_view()),


    path('articles/<int:article>/like-unlike/', views.article_like_unlike),

]

urlpatterns = format_suffix_patterns(urlpatterns)
