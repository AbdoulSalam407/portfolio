#!/usr/bin/env python
"""
Script pour importer les données de db.json dans PostgreSQL via Django
Utilisation: python manage.py shell < import_data.py
"""

import json
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
django.setup()

from api.models import Profile, Project

def import_data():
    """Importe toutes les données de db.json"""
    
    # Charger le fichier db.json
    db_json_path = os.path.join(os.path.dirname(__file__), '..', 'db.json')
    
    print(f"📂 Lecture du fichier: {db_json_path}")
    
    with open(db_json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Nettoyer les données existantes
    print("🗑️  Suppression des données existantes...")
    Profile.objects.all().delete()
    Project.objects.all().delete()
    
    # Importer le profil
    print("\n📝 Importation du profil...")
    profile_data = data.get('profile', {})
    
    if profile_data:
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
        print(f"✅ Profil créé: {profile.name}")
    else:
        print("⚠️  Aucun profil trouvé dans db.json")
    
    # Importer les projets
    print("\n📋 Importation des projets...")
    projects_data = data.get('projects', [])
    
    if projects_data:
        for i, project_data in enumerate(projects_data, 1):
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
            print(f"  ✅ [{i}] {project.title}")
        print(f"\n✅ {len(projects_data)} projets importés")
    else:
        print("⚠️  Aucun projet trouvé dans db.json")
    
    # Résumé
    print("\n" + "="*50)
    print("📊 RÉSUMÉ DE L'IMPORTATION")
    print("="*50)
    print(f"Profils: {Profile.objects.count()}")
    print(f"Projets: {Project.objects.count()}")
    print("="*50)
    print("✨ Importation terminée avec succès!")

if __name__ == '__main__':
    import_data()
