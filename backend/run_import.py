#!/usr/bin/env python
"""
Script standalone pour importer les données de db.json dans Django
"""

import os
import sys
import json
import django

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')
sys.path.insert(0, os.path.dirname(__file__))

django.setup()

from api.models import Profile, Project

def import_data():
    """Importe toutes les données de db.json"""
    
    # Chemin du fichier db.json
    db_json_path = os.path.join(os.path.dirname(__file__), '..', 'db.json')
    
    print(f"[*] Lecture du fichier: {db_json_path}")
    
    try:
        with open(db_json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"[!] Erreur lors de la lecture du fichier: {e}")
        return False
    
    # Nettoyer les données existantes
    print("[*] Suppression des donnees existantes...")
    Profile.objects.all().delete()
    Project.objects.all().delete()
    
    # Importer le profil
    print("\n[*] Importation du profil...")
    profile_data = data.get('profile', {})
    
    if profile_data:
        try:
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
            print(f"[+] Profil cree: {profile.name}")
        except Exception as e:
            print(f"[!] Erreur lors de la creation du profil: {e}")
            return False
    else:
        print("[!] Aucun profil trouve dans db.json")
    
    # Importer les projets
    print("\n[*] Importation des projets...")
    projects_data = data.get('projects', [])
    
    if projects_data:
        success_count = 0
        for i, project_data in enumerate(projects_data, 1):
            try:
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
                print(f"  [+] [{i}] {project.title}")
                success_count += 1
            except Exception as e:
                print(f"  [!] [{i}] Erreur: {e}")
        
        print(f"\n[+] {success_count}/{len(projects_data)} projets importes")
    else:
        print("[!] Aucun projet trouve dans db.json")
    
    # Résumé
    print("\n" + "="*50)
    print("RESUME DE L'IMPORTATION")
    print("="*50)
    print(f"Profils: {Profile.objects.count()}")
    print(f"Projets: {Project.objects.count()}")
    print("="*50)
    print("[+] Importation terminee avec succes!")
    return True

if __name__ == '__main__':
    import_data()
