from django.contrib import admin
from event.models import Event, GroupEventUser

# Register your models here.

admin.site.register(Event)
admin.site.register(GroupEventUser)