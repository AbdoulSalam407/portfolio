from rest_framework import serializers
from .models import Profile, Project, Education, Certification, Message, Stats


class ProfileSerializer(serializers.ModelSerializer):
    adminPassword = serializers.CharField(source='admin_password', required=False)
    aboutMe = serializers.CharField(source='about_me', required=False, allow_blank=True)
    socialLinks = serializers.JSONField(source='social_links', required=False)
    aboutContent = serializers.JSONField(source='about_content', required=False)
    
    class Meta:
        model = Profile
        fields = [
            'id', 'name', 'title', 'bio', 'adminPassword', 'aboutMe',
            'email', 'phone', 'location', 'avatar', 'cv', 'socialLinks', 'aboutContent'
        ]
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Rename fields to camelCase for frontend compatibility
        return data


class ProjectSerializer(serializers.ModelSerializer):
    githubUrl = serializers.CharField(source='github_url', required=False, allow_blank=True)
    liveUrl = serializers.CharField(source='live_url', required=False, allow_blank=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'image', 'technologies',
            'githubUrl', 'liveUrl', 'category', 'featured'
        ]


class EducationSerializer(serializers.ModelSerializer):
    startDate = serializers.CharField(source='start_date', required=False, allow_blank=True)
    endDate = serializers.CharField(source='end_date', required=False, allow_blank=True)
    
    class Meta:
        model = Education
        fields = [
            'id', 'school', 'degree', 'field', 'startDate', 'endDate', 'description'
        ]


class CertificationSerializer(serializers.ModelSerializer):
    issueDate = serializers.CharField(source='issue_date', required=False, allow_blank=True)
    expiryDate = serializers.CharField(source='expiry_date', required=False, allow_blank=True)
    credentialUrl = serializers.CharField(source='credential_url', required=False, allow_blank=True)
    
    class Meta:
        model = Certification
        fields = [
            'id', 'title', 'issuer', 'issueDate', 'expiryDate', 'image', 'skills', 'credentialUrl', 'description'
        ]


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            'id', 'name', 'email', 'subject', 'message', 'read'
        ]


class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = [
            'id', 'projects', 'clients', 'experience'
        ]
