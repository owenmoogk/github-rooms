from django.urls import path
from .views import *

urlpatterns = [
    path('project/', Project.as_view())
]