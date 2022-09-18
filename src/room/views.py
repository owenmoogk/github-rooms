from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from room.models import Room as RoomModel
from projects.models import Project as ProjectModel

class Room(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request, **kwargs):

      try:
        room = RoomModel.objects.get(pk=kwargs.get('id'))
      except Exception:
        return Response({"failure": True})
      
      projects = ProjectModel.objects.filter(room = room)
      apiLinks = []
      for i in projects:
        apiLinks.append(i.apiURL)
      
      return Response({'name': room.name, 'id': room.pk, "location": room.location, 'projects': apiLinks})
      
    def post(self, request):
      room = RoomModel(
        name=request.data.get('name'), 
        location=request.data.get('location'),
      )
      room.save()
      
      return Response({'name':room.name, "location":room.location, 'id': room.pk})