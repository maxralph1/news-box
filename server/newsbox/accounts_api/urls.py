from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views


app_name = 'accounts_api'


urlpatterns = [
    # Users
    path('authors/', views.UserList.as_view()),
    path('authors/<str:username>/', views.UserDetail.as_view()), 
    path('authors/<str:username>/soft-delete-or-reactivate/', views.UserSoftDeleteOrReactivate.as_view()),

]

urlpatterns = format_suffix_patterns(urlpatterns)