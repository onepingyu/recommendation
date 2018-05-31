from django.shortcuts import render

# Create your views here.
from event.models import Event, GroupEventUser


def get_event_details(request, event_id):
    # try:
    event = Event.objects.get(id = event_id)
    event_name = event.name
    start_time = event.start_time
    end_time = event.end_time
    address = event.address
    group = event.group.name
    descriptions = event.description
    organizers = event.organizer.all()
    members = GroupEventUser.objects.filter(event_id=event_id)
    context = {
        'event_name' : event_name,
        'start_time' :start_time,
        'end_time': end_time,
        'address': address,
        'group': group,
        'organizers': organizers,
        'descriptions': descriptions,
        'members': members
    }
    return render(request, 'event_details.html', context)
    # except:
    #     return render(request, "404.html")
