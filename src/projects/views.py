from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Project as ProjectModel

class Project(APIView):

    # permission_classes = (permissions.AllowAny,)

    def get(self, request, **kwargs):

      try:
        project = ProjectModel.objects.get(pk=kwargs.get('id'))
      except Exception:
        return Response({"failure": True})

      return Response({'id': project.pk, 'user': project.user, "apiURL": project.apiURL})
      
    def post(self, request):
      project = ProjectModel(user = request.user, apiURL = request.data.get('apiURL'))
      project.save()
      return Response({'status':'success'})