from django import forms
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseBadRequest, Http404
from django.shortcuts import render, render_to_response
from django.contrib.auth import authenticate, login, logout
from django.template import RequestContext


class UserForm(forms.Form):
    username = forms.CharField(
        required=True,
        error_messages={'required': 'please enter your name'},
        max_length=30
    )
    password = forms.CharField(
        required=True,
        label=u"密码",
        error_messages={'required': u'please enter your password'},
        widget=forms.PasswordInput(),
    )

    def clean(self):
        if not self.is_valid():
            raise forms.ValidationError(u"you must enter your name and password")
        else:
            cleaned_data = super(UserForm, self).clean()


def index(request):
    return render_to_response('index.html')


def login_view(request):
    # if request.user.is_authenticated:
    #     return HttpResponseRedirect('/')
    if request.method == 'GET':
        uf = UserForm()
        context = {'uf': uf,}
        return render(request, 'login.html', context)
    elif request.method == 'POST':
        uf = UserForm(request.POST)
        if uf.is_valid():
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if  user is not None and user.is_active:
                login(request, user)
                return HttpResponseRedirect("/")
            else:
                return render(request, 'login.html', {'uf': uf, 'password_is_wrong': True, })
        else:
            return HttpResponseRedirect("/login")

@login_required
def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/login')

def register(request):
    Method = request.method
    if Method == 'POST':
        #如果有post提交的动作，就将post中的数据赋值给uf，供该函数使用
        uf = UserForm(request.POST)
        if uf.is_valid():
            username = uf.cleaned_data['username']
            password = uf.cleaned_data['password']
            try:
                if(User.objects.filter(username=username).get().username != None):
                    return render(request, 'register.html', {'uf': uf, 'wrong': True, })
            except:
                new_user = User.objects.create(username=username)
                new_user.set_password(password)
                new_user.save()
            return HttpResponseRedirect("/")
    uf = UserForm()
    context = {'uf': uf, }
    return render(request, 'register.html', context)


