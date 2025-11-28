# 📟 Commandes Utiles

## 🚀 Démarrage

```bash
# Installation des dépendances
npm install

# Démarrer le frontend (Vite)
npm run dev

# Démarrer le backend (JSON Server)
npm run server

# Démarrer les deux en parallèle (si vous avez tmux/screen)
npm run dev & npm run server
```

## 🏗️ Build & Production

```bash
# Build optimisé
npm run build

# Prévisualiser le build
npm run preview

# Build avec sourcemaps (debug)
npm run build -- --sourcemap
```

## 🧹 Maintenance

```bash
# Mettre à jour les dépendances
npm update

# Vérifier les vulnérabilités
npm audit

# Corriger les vulnérabilités
npm audit fix

# Nettoyer les dépendances inutilisées
npm prune

# Vérifier les dépendances obsolètes
npm outdated
```

## 🔍 Développement

```bash
# Linter (si ESLint est configuré)
npm run lint

# Formatter le code (si Prettier est configuré)
npm run format

# Vérifier les types TypeScript
npx tsc --noEmit
```

## 🐛 Troubleshooting

```bash
# Réinstaller complètement
rm -rf node_modules package-lock.json
npm install

# Vider le cache npm
npm cache clean --force

# Vérifier la version de Node
node --version
npm --version

# Vérifier les ports utilisés (Linux/Mac)
lsof -i :5173
lsof -i :3001

# Vérifier les ports utilisés (Windows)
netstat -ano | findstr :5173
netstat -ano | findstr :3001
```

## 🌐 Serveurs Alternatifs

```bash
# Vite sur port différent
npm run dev -- --port 5174

# JSON Server sur port différent
npm run server -- --port 3002

# Vite avec host externe
npm run dev -- --host 0.0.0.0

# JSON Server avec délai (simulation)
npm run server -- --delay 500
```

## 📦 Gestion des Dépendances

```bash
# Ajouter une dépendance
npm install package-name

# Ajouter une dépendance de développement
npm install --save-dev package-name

# Supprimer une dépendance
npm uninstall package-name

# Lister les dépendances installées
npm list

# Lister les dépendances globales
npm list -g

# Vérifier les dépendances manquantes
npm ls
```

## 🔧 Configuration

```bash
# Voir la configuration npm
npm config list

# Définir la configuration
npm config set registry https://registry.npmjs.org/

# Réinitialiser la configuration
npm config reset
```

## 📊 Analyse

```bash
# Analyser la taille du bundle
npm run build -- --analyze

# Voir les dépendances en arbre
npm list --depth=0

# Voir les dépendances dupliquées
npm dedupe --dry-run
npm dedupe
```

## 🚢 Déploiement

### Netlify
```bash
# Build et déployer
npm run build
# Drag & drop le dossier 'dist' sur Netlify
```

### Vercel
```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

### GitHub Pages
```bash
# Ajouter à package.json
"homepage": "https://username.github.io/portfolio"

# Build
npm run build

# Déployer avec gh-pages
npm run deploy
```

## 🔐 Sécurité

```bash
# Vérifier les vulnérabilités
npm audit

# Corriger automatiquement
npm audit fix

# Corriger avec risque
npm audit fix --force

# Voir les détails des vulnérabilités
npm audit --json
```

## 📝 Scripts Personnalisés

Vous pouvez ajouter des scripts dans `package.json` :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "server": "json-server --watch db.json --port 3001",
    "lint": "eslint src --ext ts,tsx",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\"",
    "build:analyze": "vite build --analyze"
  }
}
```

Puis utiliser :
```bash
npm run lint
npm run format
npm run type-check
npm run dev:all
```

## 🎯 Workflow Développement

```bash
# 1. Démarrer les serveurs
npm run dev          # Terminal 1
npm run server       # Terminal 2

# 2. Faire des modifications
# ... éditez les fichiers ...

# 3. Vérifier les types
npx tsc --noEmit

# 4. Formater le code
npm run format

# 5. Vérifier les vulnérabilités
npm audit

# 6. Build pour production
npm run build

# 7. Tester le build
npm run preview

# 8. Déployer
# ... déployer sur votre plateforme ...
```

## 💡 Tips & Tricks

```bash
# Voir les logs npm détaillés
npm install --verbose

# Voir les logs de npm
npm config set loglevel verbose

# Ignorer les avertissements
npm install --no-audit

# Installer sans sauvegarder dans package.json
npm install --no-save package-name

# Installer une version spécifique
npm install package-name@1.2.3

# Installer la dernière version
npm install package-name@latest

# Installer une version majeure spécifique
npm install package-name@^1.0.0
```

## 🔗 Ressources Utiles

- [npm Documentation](https://docs.npmjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Dernière mise à jour** : Novembre 2024
