from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Connections.ProcessPage import pegination_connect_pages, get_current_connection
from count_connect.serializers import *


class MainPageAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        data = {
            'old_connections': ConnectSerializer(pegination_connect_pages(request), many=True).data,
            'current_connect': get_current_connection(request)
        }
        return Response(data, status.HTTP_200_OK)
