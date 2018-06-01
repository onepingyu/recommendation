from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^create/', views.create_group, name='create_group'),
    url(r'^(?P<group_id>.+)/',views.get_group_info, name='get_group_info'),
]