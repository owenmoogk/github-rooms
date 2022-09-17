from django.urls import path
from .views import *

urlpatterns = [
    path('current_user/', current_user),
    path('signup/', Signup.as_view()),
]