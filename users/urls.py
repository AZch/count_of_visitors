from django.conf.urls import url

from users.APIView.UserAPIView import UserAPIView
from users.APIView.CreateUserAPIView import CreateUserAPIView
from users.APIView.LoginUserAPIView import LoginUserAPIView
from .views import *

app_name = 'users'

urlpatterns = [
    url(r'^login', LoginUserAPIView.as_view()),
    url(r'^create', CreateUserAPIView.as_view()),
    url(r'^', UserAPIView.as_view()),
]