from django.urls import path
from . import views

urlpatterns = [
    path('reset/<int:stage>', views.reset),
]