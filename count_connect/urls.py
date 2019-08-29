from django.conf.urls import url

from count_connect.APiViews.MainPageAPIView import MainPageAPIView

app_name = 'count_connect'

urlpatterns = [
    url(r'^/', MainPageAPIView.as_view())
]