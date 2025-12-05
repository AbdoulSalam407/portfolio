from django.contrib import admin
from .models import Profile, Project


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email')
    fields = ('name', 'title', 'bio', 'admin_password', 'about_me', 'email', 'phone', 'location', 'avatar', 'social_links', 'about_content')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'description')
