from django.db import models
from django.contrib.auth.models import User
from event.models import Event

class Group(models.Model):
    id = models.CharField(primary_key=True, max_length=64, editable=False)
    name = models.CharField('名称',max_length=200, unique=True)
    creat_time = models.DateTimeField('创建时间')
    host = models.OneToOneField( User, '创始人', unique=True)
    event = models.ForeignKey( Event, '活动')

    class Meta:
        db_table = 'group'

class GroupEventUser(models.Model):
    group = models.ForeignKey( Group, '群组')
    event = models.ForeignKey( Event, '活动')
    user = models.ForeignKey( User, '用户')

    class Meta:
        db_table = 'group_event_user'