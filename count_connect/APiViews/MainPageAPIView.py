from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

class MainPageAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        return Response('{some: data}', status.HTTP_200_OK)