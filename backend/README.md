# Portfolio Backend - Django REST API

Backend Django qui se connecte à PostgreSQL sur AlwaysData et retourne les données du portfolio.

## Installation

### 1. Créer un environnement virtuel

```bash
python -m venv venv
source venv/Scripts/activate  # Windows
# ou
source venv/bin/activate  # Linux/Mac
```

### 2. Installer les dépendances

```bash
pip install -r requirements.txt
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du dossier `backend`:

```
DB_NAME=abdoul-salam-diallo_mon_portfolio
DB_USER=abdoul-salam-diallo
DB_PASSWORD=your_password_here
DB_HOST=postgresql-abdoul-salam-diallo.alwaysdata.net
DB_PORT=5432
```

**Note**: Remplacez `your_password_here` par votre mot de passe PostgreSQL sur AlwaysData.

### 4. Appliquer les migrations

```bash
python manage.py migrate
```

### 5. Charger les données depuis db.json (optionnel)

Un script de migration est fourni pour importer les données:

```bash
python manage.py shell < load_data.py
```

### 6. Lancer le serveur

```bash
python manage.py runserver 0.0.0.0:8000
```

Le serveur sera disponible à: `http://localhost:8000`

## Endpoints API

### Profile
- `GET /api/profile/` - Lister tous les profils
- `GET /api/profile/current/` - Obtenir le profil courant
- `PUT /api/profile/{id}/` - Mettre à jour un profil
- `PATCH /api/profile/{id}/` - Mise à jour partielle d'un profil

### Projects
- `GET /api/projects/` - Lister tous les projets
- `GET /api/projects/?category=web` - Filtrer par catégorie
- `POST /api/projects/` - Créer un nouveau projet
- `GET /api/projects/{id}/` - Obtenir un projet spécifique
- `PUT /api/projects/{id}/` - Mettre à jour un projet
- `DELETE /api/projects/{id}/` - Supprimer un projet

## Structure des données

### Profile
```json
{
  "id": 1,
  "name": "Abdoul Salam Diallo",
  "title": "Développeur Full Stack",
  "bio": "...",
  "adminPassword": "AsdGoby781209169#",
  "aboutMe": "...",
  "email": "contact@example.com",
  "phone": "+33 6 XX XX XX XX",
  "location": "France",
  "avatar": "data:image/jpeg;base64,...",
  "socialLinks": [...],
  "aboutContent": {...}
}
```

### Project
```json
{
  "id": 1,
  "title": "E-Commerce Platform",
  "description": "...",
  "image": "data:image/png;base64,...",
  "technologies": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://example.com",
  "category": "web",
  "featured": true
}
```

## Configuration CORS

Le backend accepte les requêtes CORS depuis:
- `http://localhost:5173` (Vite)
- `http://localhost:3000`
- `http://127.0.0.1:5173`

## Troubleshooting

### Erreur de connexion PostgreSQL
- Vérifiez que les identifiants dans `.env` sont corrects
- Vérifiez que la base de données existe sur AlwaysData
- Vérifiez la connectivité réseau

### Erreur de migration
```bash
python manage.py migrate --run-syncdb
```

### Réinitialiser la base de données
```bash
python manage.py flush
python manage.py migrate
```
