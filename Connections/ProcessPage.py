from count_connect.models import Page, Connect
from count_connect.serializers import ConnectSerializer
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage


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

    return Connect.objects.filter(page=page)


def get_current_connection(request):
    page = Page.objects.get_or_create(url_page=request.path)[0]
    user_ip = get_ip_user(request)
    data = {'ip_addr': user_ip, 'user': None}
    if not request.user.is_anonymous:
        data['user'] = request.user.id
    return data


def pegination_connect_pages(request):
    if request.GET.get('page') is None:
        connect_page_list = process_page_from_request(request)
    else:
        page = Page.objects.get_or_create(url_page=request.path)[0]
        connect_page_list = Connect.objects.filter(page=page)

    paginator = Paginator(connect_page_list, 2)
    page = request.GET.get('page')
    try:
        connect_page = paginator.page(page)
    except PageNotAnInteger:
        connect_page = paginator.page(1)
    except EmptyPage:
        connect_page = paginator.page(paginator.num_pages)
    return connect_page
