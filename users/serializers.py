from rest_framework import serializers

from users.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ('id', 'email', 'password', 'login')
        extra_kwargs = {'password': {'write_only': True}}