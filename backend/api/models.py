from django.db import models
from django.contrib.postgres.fields import ArrayField
import json


class Profile(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    bio = models.TextField()
    admin_password = models.CharField(max_length=255, default='AsdGoby781209169#')
    about_me = models.TextField(blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=255)
    avatar = models.TextField()  # Base64 encoded image
    cv = models.TextField(blank=True, null=True)  # URL or Base64 encoded PDF
    social_links = models.JSONField(default=list)
    about_content = models.JSONField(default=dict)
    
    class Meta:
        db_table = 'api_profile'
    
    def __str__(self):
        return self.name


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('web', 'Web'),
        ('mobile', 'Mobile'),
        ('data', 'Data'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.TextField()  # Base64 encoded image
    technologies = models.JSONField(default=list)
    github_url = models.URLField(blank=True, null=True)
    live_url = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'api_project'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Education(models.Model):
    school = models.CharField(max_length=255)
    degree = models.CharField(max_length=255)
    field = models.CharField(max_length=255)
    start_date = models.CharField(max_length=50, blank=True, null=True)
    end_date = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'api_education'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.degree} - {self.school}"


class Certification(models.Model):
    title = models.CharField(max_length=255)
    issuer = models.CharField(max_length=255)
    issue_date = models.CharField(max_length=50, blank=True, null=True)
    expiry_date = models.CharField(max_length=50, blank=True, null=True)
    image = models.TextField(blank=True, null=True)  # URL or Base64 encoded image
    skills = models.JSONField(default=list, blank=True)  # List of skills
    credential_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'api_certification'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.issuer}"


class Message(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'api_message'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.subject} - {self.name}"


class Stats(models.Model):
    projects = models.IntegerField(default=0)
    clients = models.IntegerField(default=0)
    experience = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'api_stats'
    
    def __str__(self):
        return f"Stats - Projects: {self.projects}, Clients: {self.clients}"
