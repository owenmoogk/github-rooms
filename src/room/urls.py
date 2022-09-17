from django.urls import path
from .views import *

urlpatterns = [
    path('room/<int:id>/', Room.as_view())
]