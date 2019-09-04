from django.conf.urls import url

from users.APIView.UserAPIView import UserAPIView
from users.APIView.CreateUserAPIView import CreateUserAPIView
from .views import *

app_name = 'users'

urlpatterns = [
    url(r'^login', authenticate_user),
    url(r'^create', CreateUserAPIView.as_view()),
    url(r'^', UserAPIView.as_view()),
]