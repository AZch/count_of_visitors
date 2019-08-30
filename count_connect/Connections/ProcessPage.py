from count_connect.models import Page, Connect
from count_connect.serializers import ConnectSerializer


def get_ip_user(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def process_page_from_request(request):
    page = Page.objects.get_or_create(url_page=request.path)[0]
    user_ip = get_ip_user(request)
    data = {'ip_addr': user_ip, 'page': page.id, 'user': None}
    if not request.user.is_anonymous:
        data['user'] = request.user.id
    serializer = ConnectSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    connections = Connect.objects.filter(page=page)
    return ConnectSerializer(connections, many=True).data
