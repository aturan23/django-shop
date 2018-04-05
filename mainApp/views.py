from django.shortcuts import redirect, get_object_or_404, render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login

from .models import Good

def index(request):
    goods_by_id = Good.objects.order_by('-id')[:5]
    context = {
        'goods': goods_by_id,
    }
    return render(request, "main/index.html", context)

def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('index')
    else:
        form = UserCreationForm()
    ctx = {'form': form}
    return render(request, "registration/register.html", ctx)

def detail(request, good_id):
    good = get_object_or_404(Good, pk=good_id)
    return render(request, 'main/detail.html', {'good': good})
