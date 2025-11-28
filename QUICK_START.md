# 🚀 Démarrage Rapide

## 5 Minutes pour Lancer le Projet

### Étape 1 : Installation (2 min)
```bash
cd portfolio
npm install
```

### Étape 2 : Lancer les Serveurs (2 min)

**Terminal 1 - Frontend**
```bash
npm run dev
```
➜ Ouvrir : http://localhost:5173

**Terminal 2 - Backend**
```bash
npm run server
```
➜ API disponible : http://localhost:3001

### Étape 3 : Tester (1 min)

✅ **Pages Publiques**
- Accueil : http://localhost:5173/
- À propos : http://localhost:5173/about
- Projets : http://localhost:5173/projects
- Contact : http://localhost:5173/contact

✅ **Admin Panel**
- Connexion : http://localhost:5173/admin
- Mot de passe : `admin123`
- Dashboard : http://localhost:5173/admin/dashboard

## 📝 Données de Test

Le fichier `db.json` contient :
- 3 projets d'exemple
- 2 attestations
- 2 formations
- 1 message de test

## 🛠️ Commandes Essentielles

```bash
# Développement
npm run dev          # Démarrer Vite
npm run server       # Démarrer JSON Server

# Production
npm run build        # Build optimisé
npm run preview      # Prévisualiser le build

# Maintenance
npm install          # Installer les dépendances
npm update           # Mettre à jour
npm audit            # Vérifier les vulnérabilités
```

## 📂 Structure Clé

```
src/
├── pages/           # Pages publiques et admin
├── components/      # Composants réutilisables
├── services/        # API calls
├── stores/          # Zustand stores
├── types/           # TypeScript interfaces
└── utils/           # Helpers et validation
```

## 🎯 Prochaines Étapes

1. **Personnaliser les données**
   - Éditer `db.json` avec vos données
   - Remplacer les images placeholders

2. **Créer les pages admin manquantes**
   - Voir `ADMIN_PAGES_TODO.md`
   - Implémenter CRUD pour chaque entité

3. **Ajouter votre contenu**
   - Projets personnels
   - Formations et certifications
   - Informations de contact

4. **Déployer**
   - Netlify, Vercel ou autre plateforme
   - Configurer les variables d'environnement
   - Utiliser une vraie API backend

## 🔐 Authentification Admin

- **URL** : `/admin`
- **Mot de passe** : `admin123`
- **Stockage** : localStorage (dev only)

⚠️ **Pour la production** : Implémenter une vraie authentification

## 📊 API Endpoints

```
GET    /projects
POST   /projects
PUT    /projects/:id
DELETE /projects/:id

GET    /certifications
POST   /certifications
PUT    /certifications/:id
DELETE /certifications/:id

GET    /education
POST   /education
PUT    /education/:id
DELETE /education/:id

GET    /messages
POST   /messages
PATCH  /messages/:id
DELETE /messages/:id

GET    /profile
PUT    /profile

GET    /stats
```

## 🐛 Troubleshooting

**Port 5173 occupé?**
```bash
npm run dev -- --port 5174
```

**Port 3001 occupé?**
```bash
npm run server -- --port 3002
```

**Erreurs de module?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Styles Tailwind ne s'appliquent pas?**
```bash
npm run build
```

## 📚 Documentation Complète

- `README.md` - Documentation principale
- `SETUP_GUIDE.md` - Guide de configuration détaillé
- `PROJECT_SUMMARY.md` - Vue d'ensemble du projet
- `ADMIN_PAGES_TODO.md` - Pages admin à créer

## ✨ Stack Utilisé

- React 18 + TypeScript
- Vite (build ultra-rapide)
- Tailwind CSS
- React Router
- Zustand (état)
- Zod (validation)
- Axios (HTTP)
- SweetAlert2 (notifications)

## 🎨 Personnalisation

### Couleurs
Éditer `tailwind.config.js` :
```javascript
colors: {
  primary: {
    700: '#votre-couleur',
  }
}
```

### Fonts
Éditer `index.css` :
```css
@import url('https://fonts.googleapis.com/css2?family=...');
```

### Contenu
Éditer `db.json` pour vos données

## 🚢 Déploiement Rapide

### Netlify
```bash
npm run build
# Drag & drop le dossier 'dist'
```

### Vercel
```bash
npm run build
# Importer le repo GitHub
```

## 💡 Tips & Tricks

1. **Hot Reload** : Les changements se rechargent automatiquement
2. **DevTools** : Ouvrir avec F12
3. **Console** : Vérifier les erreurs
4. **Network** : Vérifier les appels API
5. **Responsive** : Tester sur mobile avec F12

## 🎓 Ressources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org)

## ✅ Checklist Démarrage

- [ ] `npm install` exécuté
- [ ] Terminal 1 : `npm run dev` lancé
- [ ] Terminal 2 : `npm run server` lancé
- [ ] Frontend accessible sur http://localhost:5173
- [ ] Backend accessible sur http://localhost:3001
- [ ] Admin login fonctionne
- [ ] Données affichées correctement

---

**Prêt à commencer?** Lancez les commandes ci-dessus et explorez! 🎉
