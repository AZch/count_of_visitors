import json

from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Process.ProcessPage import pegination_connect_pages, get_current_connection
from count_connect.serializers import ConnectSerializer
from users.models import User
from users.serializers import UserSerializer


class UserAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, requests):
        result = {
            'old_connections': pegination_connect_pages(requests),
            'current_connect': get_current_connection(requests)
        }

        return Response(result, status.HTTP_200_OK)


    def put(self, requests):
        data = json.loads(requests.body.decode('utf-8'))
        user = User.objects.get(email=data['email'], password=data['oldPassword'])
        if user:
            data['password'] = data['newPassword']
            serializer = UserSerializer(user, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'cant find user'}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, requests):
        try:
            requests.user.delete()
            res = {'res': 'complete delete'}
            return Response(res, status=status.HTTP_200_OK)
        except:
            res = {'error': 'cant delete user'}
            return Response(res, status=status.HTTP_403_FORBIDDEN)
