from django.urls import path
from . import views

app_name = 'mainApp'
urlpatterns = [
    path('', views.index, name="index"),
    path('registerpythone', views.register, name="register"),
    path('product/<int:good_id>/', views.detail, name='detail'),
]
