from django.db import models, transaction

from users.models import User


class Page(models.Model):
    url_page = models.CharField(max_length=200)


class Connect(models.Model):
    user_id = models.IntegerField()
    user = models.ForeignKey(
        User,
        on_delete=models.DO_NOTHING,
        default=None
    )
    page = models.ForeignKey(
        Page,
        on_delete=models.CASCADE,
    )
