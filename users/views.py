import jwt
from django.contrib.auth import user_logged_in
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings
from rest_framework_jwt.serializers import jwt_payload_handler

from users.models import User
from users.serializers import UserSerializer


@api_view(['POST'])
@permission_classes([AllowAny,])
def create_user(requests):
    user = requests.data
    serializer = UserSerializer(data=user)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny,])
def authenticate_user(requests):
    try:
        email = requests.data['email']
        password = requests.data['password']

        user = User.objects.get(email=email, password=password)
        if user:
            try:
                payload = jwt_payload_handler(user)
                token = jwt.encode(payload, settings.SECRET_KEY)
                user_details = {
                    'email': user.email,
                    'login': user.login,
                    'token': token
                }
                user_logged_in.send(sender=user.__class__,
                                    requests=requests,
                                    user=user)
                return Response(user_details, status=status.HTTP_200_OK)
            except Exception as e:
                res = {'error': 'problem with create jwt'}
                return Response(res, status=status.HTTP_403_FORBIDDEN)
        else:
            res = {'error': 'can not authenticate with the given credentials or the account has been deactivated'}
            return Response(res, status=status.HTTP_403_FORBIDDEN)
    except:
        res = {'error': 'please provide a email or password'}
        return Response(res, status=status.HTTP_403_FORBIDDEN)
