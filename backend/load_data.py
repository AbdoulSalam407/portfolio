import json
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from api.models import Profile, Project

# Load data from db.json
with open('../db.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Clear existing data
Profile.objects.all().delete()
Project.objects.all().delete()

# Create profile
profile_data = data.get('profile', {})
profile = Profile.objects.create(
    name=profile_data.get('name', ''),
    title=profile_data.get('title', ''),
    bio=profile_data.get('bio', ''),
    admin_password=profile_data.get('adminPassword', 'AsdGoby781209169#'),
    about_me=profile_data.get('aboutMe', ''),
    email=profile_data.get('email', ''),
    phone=profile_data.get('phone', ''),
    location=profile_data.get('location', ''),
    avatar=profile_data.get('avatar', ''),
    social_links=profile_data.get('socialLinks', []),
    about_content=profile_data.get('aboutContent', {}),
)
print(f"Profile créé: {profile.name}")

# Create projects
projects_data = data.get('projects', [])
for project_data in projects_data:
    project = Project.objects.create(
        title=project_data.get('title', ''),
        description=project_data.get('description', ''),
        image=project_data.get('image', ''),
        technologies=project_data.get('technologies', []),
        github_url=project_data.get('githubUrl', ''),
        live_url=project_data.get('liveUrl', ''),
        category=project_data.get('category', 'other'),
        featured=project_data.get('featured', False),
    )
    print(f"Projet créé: {project.title}")

print("Données importées avec succès!")
