from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ProfileViewSet, ProjectViewSet, EducationViewSet, CertificationViewSet, MessageViewSet, StatsViewSet

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'certifications', CertificationViewSet, basename='certification')
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'stats', StatsViewSet, basename='stats')

urlpatterns = [
    path('api/', include(router.urls)),
]
