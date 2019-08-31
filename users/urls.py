from django.conf.urls import url

from users.APIView.UserAPIView import UserAPIView

app_name = 'users'

urlpatterns = [
    url(r'^update/', UserAPIView.as_view()),
    url(r'^delete/', UserAPIView.as_view()),
]