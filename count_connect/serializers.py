from rest_framework import serializers

from count_connect.models import *


class ConnectSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Connect
        fields = ('id', 'ip_addr', 'page', 'user')


class PageSerializer(serializers.ModelSerializer):
    class Met(object):
        model = Page
        fields = ('id', 'url_page')
