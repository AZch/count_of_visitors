from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Connections.ProcessPage import process_page_from_request


class SecondPageAPIView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        result_data = process_page_from_request(request)

        return Response(result_data, status.HTTP_200_OK)
