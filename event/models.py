from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    id = models.CharField(primary_key=True, max_length=64, editable=False)
    name = models.CharField('名称',max_length=200, unique=True)
    # host = models.OneToOneField(User, "创始人", unique=True)
    organizer = models.ManyToManyField(User, verbose_name="组织者", blank=True)
    member = models.IntegerField('参加人数')
    description = models.TextField('活动描述',blank=True)
    time = models.DateTimeField('活动开始时间')
    creat_time = models.DateTimeField('创建时间')
    update_time = models.DateTimeField('更新时间')

    class Meta:
        db_table = 'event_details'

class EventMember():
    event = models.ForeignKey( Event, '活动')
    user = models.ForeignKey( User, '用户')

    class Meta:
        db_table = 'event_member'

# class Topic(models.Model):
#     id = models.CharField(primary_key=True, max_length=64, editable=False)
#     topic = models.CharField("主题", max_length=200, unique=True)












