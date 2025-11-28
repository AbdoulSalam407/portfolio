# Portfolio Professionnel - React.js

Un portfolio professionnel dynamique et moderne construit avec React.js 18+, TypeScript, Tailwind CSS et Vite.

## 🚀 Fonctionnalités

### Pages Publiques
- **Accueil** : Hero section avec présentation rapide
- **À propos** : Bio, compétences, parcours et valeurs
- **Projets** : Grid de projets avec filtres par technologie et catégorie
- **Formations** : Timeline éducative avec détails
- **Attestations** : Gallery de certifications professionnelles
- **Contact** : Formulaire de contact fonctionnel avec validation

### Espace Admin Sécurisé
- **Authentification** : Connexion par mot de passe
- **Dashboard** : Statistiques et aperçu des données
- **Gestion de contenu** :
  - CRUD complet pour les projets
  - CRUD pour les attestations
  - Gestion des formations
  - Consultation des messages reçus

## 📋 Stack Technique

### Frontend
- **React.js** 18+ avec TypeScript
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styling utilitaire
- **Lucide React** - Icônes modernes
- **Framer Motion** - Animations fluides
- **React Router** - Navigation côté client

### Backend & Data
- **JSON Server** - API REST simulée
- **Axios** - HTTP client
- **Zod** - Validation de schémas TypeScript
- **Zustand** - Gestion d'état légère
- **React Hook Form** - Gestion de formulaires

### Notifications & UI
- **SweetAlert2** - Alertes élégantes
- **React Hot Toast** - Notifications toast

## 🛠️ Installation

### Prérequis
- Node.js 16+ et npm/yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd portfolio
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur de développement**

Terminal 1 - Frontend (Vite):
```bash
npm run dev
```

Terminal 2 - Backend (JSON Server):
```bash
npm run server
```

Le frontend sera accessible à `http://localhost:5173`
Le backend sera accessible à `http://localhost:3001`

## 📁 Structure du Projet

```
portfolio/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/
│   │   ├── ui/            # Composants UI réutilisables
│   │   ├── layout/        # Header, Footer
│   │   └── sections/      # Sections de pages
│   ├── pages/
│   │   ├── admin/         # Pages admin
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── Certifications.tsx
│   │   ├── Contact.tsx
│   │   └── AdminLogin.tsx
│   ├── hooks/             # Custom React hooks
│   ├── utils/
│   │   ├── validation.ts  # Schémas Zod
│   │   └── cn.ts          # Utilitaires CSS
│   ├── services/
│   │   └── api.ts         # Appels API
│   ├── stores/
│   │   └── authStore.ts   # Zustand store
│   ├── types/
│   │   └── index.ts       # Interfaces TypeScript
│   ├── App.tsx            # Composant principal
│   ├── main.tsx           # Point d'entrée
│   └── index.css          # Styles globaux
├── db.json                # Base de données JSON Server
├── vite.config.ts         # Configuration Vite
├── tailwind.config.js     # Configuration Tailwind
├── tsconfig.json          # Configuration TypeScript
└── package.json           # Dépendances
```

## 🔐 Authentification Admin

**Mot de passe par défaut** : `admin123`

Accédez au panel admin à : `http://localhost:5173/admin`

## 📊 Modèles de Données

### Projet
```typescript
{
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'data' | 'other';
  featured: boolean;
  createdAt: string;
}
```

### Attestation
```typescript
{
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  image: string;
  credentialUrl?: string;
  skills: string[];
}
```

### Formation
```typescript
{
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}
```

## 🎨 Palette de Couleurs

- **Primaire** : Bleu foncé (#1E3A8A, #1E40AF)
- **Secondaire** : Blanc (#FFFFFF)
- **Accent** : Gris (#F3F4F6)

## 🚀 Déploiement

### Build pour production
```bash
npm run build
```

### Preview du build
```bash
npm run preview
```

Le dossier `dist/` contient les fichiers optimisés prêts pour le déploiement.

## 📝 Scripts Disponibles

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Construire pour la production
- `npm run preview` - Prévisualiser le build
- `npm run server` - Démarrer JSON Server

## 🔄 API Endpoints

### Projets
- `GET /projects` - Récupérer tous les projets
- `POST /projects` - Créer un projet
- `PUT /projects/:id` - Mettre à jour un projet
- `DELETE /projects/:id` - Supprimer un projet

### Attestations
- `GET /certifications` - Récupérer toutes les attestations
- `POST /certifications` - Créer une attestation
- `PUT /certifications/:id` - Mettre à jour
- `DELETE /certifications/:id` - Supprimer

### Formations
- `GET /education` - Récupérer les formations
- `POST /education` - Créer une formation
- `PUT /education/:id` - Mettre à jour
- `DELETE /education/:id` - Supprimer

### Messages
- `GET /messages` - Récupérer les messages
- `POST /messages` - Créer un message
- `PATCH /messages/:id` - Marquer comme lu
- `DELETE /messages/:id` - Supprimer

## 🎯 Fonctionnalités Avancées

- ✅ Validation complète avec Zod
- ✅ Gestion d'état avec Zustand
- ✅ Animations fluides avec Framer Motion
- ✅ Responsive design mobile-first
- ✅ Accessibilité ARIA
- ✅ Code splitting automatique
- ✅ Lazy loading des images
- ✅ Formulaires avec React Hook Form
- ✅ Notifications SweetAlert2

## 📱 Responsive Design

Le portfolio est entièrement responsive et optimisé pour :
- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🐛 Troubleshooting

### Le serveur JSON Server ne démarre pas
```bash
# Vérifier que le port 3001 est libre
# Ou modifier le port dans package.json
npm run server -- --port 3002
```

### Les styles Tailwind ne s'appliquent pas
```bash
# Reconstruire les styles
npm run build
```

### Erreurs TypeScript
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

## 📄 Licence

Ce projet est sous licence MIT.

## 👤 Auteur

Abdoul Salam Diallo

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Dernière mise à jour** : Novembre 2024
