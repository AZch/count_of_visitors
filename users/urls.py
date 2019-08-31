from django.conf.urls import url

from users.APIView.UserAPIView import UserAPIView
from .views import *

app_name = 'users'

urlpatterns = [
    url(r'^$', UserAPIView.as_view()),
    url(r'^login', authenticate_user),
    url(r'^create/', create_user),
]