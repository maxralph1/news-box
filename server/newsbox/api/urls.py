from django.urls import path, include


app_name = 'api'

urlpatterns = [
    path('accounts/', include('accounts_api.urls', namespace='accounts_api')),
    path('posts/', include('posts_api.urls', namespace='posts_api')),
    path('auth/', include('auth_api.urls', namespace='auth_api')),
]

