from django.contrib.auth.models import User
from django.shortcuts import render

# Create your views here.
from group.models import Group


def get_group_info(request, group_id):
    group = Group.objects.get(id=group_id)
    group_name = group.name
    create_time = group.create_time
    host_name = User.objects.get(id=group.host_id).username
    address = group.address
    descriptions = group.description
    members = group.member.all()
    context = {
        'group_name': group_name,
        'create_time': create_time,
        'host_name': host_name,
        'members': members,
        'member_num': len(members),
        'address': address,
        'descriptions': descriptions,
    }
    return render(request, 'group_details.html', context)
