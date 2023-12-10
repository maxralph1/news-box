from django.urls import path
from .views import CustomTokenObtainPairView, RegisterUser, BlacklistTokenUpdateView
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)


app_name = 'auth_api'

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterUser.as_view(), name="register_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist_token')
]
