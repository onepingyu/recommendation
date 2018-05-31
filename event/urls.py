from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^(?P<event_id>.+)/',views.get_event_details, name='get_event_details'),
]