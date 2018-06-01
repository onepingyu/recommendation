from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# Create your views here.
from event.models import Event, GroupEventUser

@login_required
def get_event_details(request, event_id):
    # try:
    has_login = True if request.user.is_authenticated else False
    event = Event.objects.get(id = event_id)
    event_name = event.name
    start_time = event.start_time
    end_time = event.end_time
    address = event.address
    group = event.group.name
    descriptions = event.description
    organizers = event.organizer.all()
    members = GroupEventUser.objects.filter(event_id=event_id)
    has_attend = False
    try:
        if members.get(user_id=request.user.id):
            has_attend = True
    except:
        pass
    context = {
        'event_name' : event_name,
        'start_time' :start_time,
        'end_time': end_time,
        'address': address,
        'group': group,
        'organizers': organizers,
        'descriptions': descriptions,
        'members': members,
        'has_attend': has_attend,
        'has_login': has_login
    }
    if request.method == 'GET':
        return render(request, 'event_details.html', context)
    else:
        user_id = request.user.id
        group_event_user = GroupEventUser.objects.create(group_id=event.group.id,event_id=event_id,user_id=user_id)
        group_event_user.save()
        event.member += 1
        event.save()
        context['has_attend'] = True
        members.add(group_event_user)
        context['members'] = members
        return render(request, 'event_details.html', context)
    # except:
    #     return render(request, "404.html")

def create_event(request):
    return render(request, 'event_model.html')

