from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.
from group.models import Group


def get_group_info(request, group_id):
    has_login = True if request.user.is_authenticated else False
    group = Group.objects.get(id=group_id)
    group_name = group.name
    create_time = group.create_time
    host_name = User.objects.get(id=group.host_id).username
    address = group.address
    descriptions = group.description
    members = group.member.all()
    has_attend = False
    try:
        if members.get(id=request.user.id):
            has_attend = True
    except:
        pass
    context = {
        'group_name': group_name,
        'create_time': create_time,
        'host_name': host_name,
        'members': members,
        'member_num': len(members),
        'address': address,
        'descriptions': descriptions,
        'has_attend': has_attend,
        'has_login': has_login
    }
    if request.method == 'GET':
        return render(request, 'group_details.html', context)
    else:
        group.member.add(request.user)
        group.save()
        context['has_attend'] = True
        context['members'] = group.member.all()
        return render(request, 'group_details.html', context)

def create_group(request):
    return render(request, 'group_model.html')