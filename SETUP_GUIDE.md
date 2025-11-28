# Guide de Configuration et Démarrage

## 🎯 Étapes Rapides pour Démarrer

### 1. Installation des Dépendances
```bash
npm install
```

### 2. Démarrer le Projet

**Terminal 1 - Frontend (Vite)**
```bash
npm run dev
```
Accès : http://localhost:5173

**Terminal 2 - Backend (JSON Server)**
```bash
npm run server
```
Accès : http://localhost:3001

## 🔐 Accès Admin

- **URL** : http://localhost:5173/admin
- **Mot de passe** : `admin123`

## 📝 Données Initiales

Le fichier `db.json` contient des données d'exemple :
- 3 projets
- 2 attestations
- 2 formations
- 1 message d'exemple
- Statistiques

## 🛠️ Développement

### Ajouter une Nouvelle Page

1. Créer le fichier dans `src/pages/`
```typescript
// src/pages/NewPage.tsx
export function NewPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      {/* Contenu */}
    </div>
  );
}
```

2. Ajouter la route dans `src/App.tsx`
```typescript
<Route path="/new-page" element={<NewPage />} />
```

3. Ajouter le lien dans `src/components/layout/Header.tsx`

### Ajouter un Nouveau Composant UI

1. Créer dans `src/components/ui/`
2. Exporter depuis le fichier
3. Utiliser dans les pages

### Ajouter une Validation de Formulaire

1. Créer le schéma Zod dans `src/utils/validation.ts`
```typescript
export const MySchema = z.object({
  field: z.string().min(1, 'Message d\'erreur'),
});

export type MyInput = z.infer<typeof MySchema>;
```

2. Utiliser dans le formulaire avec React Hook Form
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<MyInput>({
  resolver: zodResolver(MySchema),
});
```

## 📊 Ajouter une Nouvelle Entité API

1. Ajouter le type dans `src/types/index.ts`
2. Ajouter le schéma Zod dans `src/utils/validation.ts`
3. Ajouter les endpoints dans `src/services/api.ts`
4. Ajouter les données dans `db.json`
5. Créer la page de gestion dans `src/pages/admin/`

## 🎨 Personnaliser les Couleurs

Modifier `tailwind.config.js` :
```javascript
colors: {
  primary: {
    700: '#1e40af', // Votre couleur
    // ...
  }
}
```

## 🚀 Build pour Production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

## 📦 Déploiement

### Sur Netlify
1. Connecter le repo GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`

### Sur Vercel
1. Importer le projet
2. Framework: Vite
3. Déployer

## 🐛 Dépannage

### Port 5173 déjà utilisé
```bash
npm run dev -- --port 5174
```

### Port 3001 déjà utilisé
```bash
npm run server -- --port 3002
```

### Erreurs de module
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Ressources Utiles

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Zod Documentation](https://zod.dev)
- [React Router](https://reactrouter.com)

## ✅ Checklist de Déploiement

- [ ] Tester toutes les pages publiques
- [ ] Tester le formulaire de contact
- [ ] Tester la connexion admin
- [ ] Tester CRUD des projets
- [ ] Tester CRUD des attestations
- [ ] Vérifier la responsivité mobile
- [ ] Vérifier les performances
- [ ] Mettre à jour les métadonnées
- [ ] Configurer les variables d'environnement
- [ ] Déployer sur la plateforme

## 🔄 Maintenance

### Mise à jour des dépendances
```bash
npm update
```

### Vérifier les vulnérabilités
```bash
npm audit
npm audit fix
```

## 📞 Support

Pour toute question ou problème, consultez la documentation ou ouvrez une issue.

---

**Dernière mise à jour** : Novembre 2024
