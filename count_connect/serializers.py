from rest_framework import serializers

from count_connect.models import *


class ConnectSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Connect
        field = ('id', 'ip_addr')


class PageSerializer(serializers.ModelSerializer):
    class Met(object):
        model = Page
        field = ('id', 'url_page')
