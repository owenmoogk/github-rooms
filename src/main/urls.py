from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token-auth/', obtain_jwt_token),
    path('users/', include('users.urls')),
    path('projects/', include('projects.urls')),
    path('api/', include('room.urls')),
    path('', include('frontend.urls'))
]