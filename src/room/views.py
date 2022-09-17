from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from room.models import Room as RoomModel


# Create your views here.
class Room(APIView):

    def get(self, request, **kwargs):

      room = RoomModel.objects.get(pk=kwargs.get('id'))

      return Response({'name': room.name, 'id': room.pk})
      
