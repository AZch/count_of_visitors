from Process.Convertors import strToInt
from count_connect.models import Page, Connect
from count_connect.serializers import ConnectSerializer
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from users.models import User
from users.serializers import UserSerializer


def get_ip_user(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def fill_user_json_conn(connections):
    connections_json = ConnectSerializer(connections, many=True).data
    for connect in connections_json:
        if connect['user'] is not None:
            user = User.objects.get(id=connect['user'])
            connect['user'] = UserSerializer(user).data['login']
    return connections_json

def process_page_from_request(request):
    page = Page.objects.get_or_create(url_page=request.path)[0]
    user_ip = get_ip_user(request)
    data = {'ip_addr': user_ip, 'page': page.id, 'user': None}
    if not request.user.is_anonymous:
        data['user'] = request.user.id
    serializer = ConnectSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return get_conn_for_page(page)


def get_conn_for_page(page):
    return Connect.objects.filter(page=page).reverse()


def get_current_connection(request):
    user_ip = get_ip_user(request)
    data = {'ip_addr': user_ip, 'user': None}
    if not request.user.is_anonymous:
        data['user'] = request.user.login
    return data


def pegination_connect_pages(request):
    page = strToInt(request.GET.get('page'))
    if page is None or page <= 1:
        connect_page_list = process_page_from_request(request)
    else:
        pageWeb = Page.objects.get_or_create(url_page=request.path)[0]
        connect_page_list = get_conn_for_page(pageWeb)

    paginator = Paginator(connect_page_list, 10)
    try:
        connect_page = paginator.page(page)
    except PageNotAnInteger:
        connect_page = []
    except EmptyPage:
        connect_page = []
    return fill_user_json_conn(connect_page)
