from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Process.ProcessPage import pegination_connect_pages, get_current_connection
from count_connect.serializers import ConnectSerializer
from users.models import User
from users.serializers import UserSerializer
import json


class CreateUserAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, requests):
        data = json.loads(requests.body.decode('utf-8'))
        try:
            serializer = UserSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'error': 'provide field'}, status=status.HTTP_403_FORBIDDEN)

    def get(self, requests):
        result = {
            'old_connections': pegination_connect_pages(requests),
            'current_connect': get_current_connection(requests)
        }

        return Response(result, status.HTTP_200_OK)