from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Project as ProjectModel
from room.models import Room as RoomModel

class Project(APIView):

    permission_classes = (permissions.AllowAny,)

    def get(self, request, **kwargs):

      try:
        project = ProjectModel.objects.get(pk=kwargs.get('id'))
      except Exception:
        return Response({"failure": True})

      return Response({'id': project.pk, 'user': project.user, "apiURL": project.apiURL})
      
    def post(self, request):

      matchingProjects = ProjectModel.objects.filter(apiURL = request.data.get('apiURL'))
      if len(matchingProjects) != 0:
        return Response({'status':'success'})

      project = ProjectModel(user = request.user, apiURL = request.data.get('apiURL'), room = RoomModel.objects.get(id=request.data.get('room')))
      project.save()

      return Response({'status':'success'})