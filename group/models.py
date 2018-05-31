from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    id = models.CharField(primary_key=True, max_length=64, editable=False)
    name = models.CharField('名称',max_length=200, unique=True)
    create_time = models.DateTimeField('创建时间')
    member = models.ManyToManyField(User, "成员")
    address = models.CharField('地址',max_length=200, unique=True)
    description = models.TextField('描述', blank=True)
    host_id = models.CharField('创建人id', max_length=64, editable=False)

    class Meta:
        db_table = 'group'
