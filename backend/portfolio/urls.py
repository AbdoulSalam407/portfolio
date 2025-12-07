from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ProfileViewSet, ProjectViewSet, EducationViewSet, CertificationViewSet, MessageViewSet, StatsViewSet
from rest_framework.response import Response
from rest_framework.decorators import api_view

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'certifications', CertificationViewSet, basename='certification')
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'stats', StatsViewSet, basename='stats')

@api_view(['GET'])
def api_root(request):
    return Response({'message': 'Portfolio API is running'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', api_root, name='api-root'),
]
