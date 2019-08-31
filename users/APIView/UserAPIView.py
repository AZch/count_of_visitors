from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Connections.ProcessPage import pegination_connect_pages
from count_connect.serializers import ConnectSerializer
from users.models import User
from users.serializers import UserSerializer


class UserAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, requests):
        result = {
            'connections': ConnectSerializer(pegination_connect_pages(requests), many=True).data,
            'user': UserSerializer(requests.user).data
        }

        return Response(result, status.HTTP_200_OK)


    def put(self, requests):
        serializer = UserSerializer(requests.user, data=requests.data.get('user', {}), partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, requests):
        try:
            requests.user.delete()
            res = {'res': 'complete delete'}
            return Response(res, status=status.HTTP_200_OK)
        except:
            res = {'error': 'cant delete user'}
            return Response(res, status=status.HTTP_403_FORBIDDEN)
