# Pages Admin à Créer

Ce document liste les pages admin qui doivent être créées pour compléter le dashboard.

## Pages à Créer

### 1. `/admin/projects` - Gestion des Projets
```typescript
// src/pages/admin/Projects.tsx
- Liste des projets avec tableau
- Boutons Créer, Éditer, Supprimer
- Formulaire modal pour ajouter/éditer
- Validation avec Zod
- Notifications SweetAlert2
```

### 2. `/admin/certifications` - Gestion des Attestations
```typescript
// src/pages/admin/Certifications.tsx
- Liste des attestations
- CRUD complet
- Formulaire avec upload d'image
- Gestion des compétences (tags)
```

### 3. `/admin/education` - Gestion des Formations
```typescript
// src/pages/admin/Education.tsx
- Timeline des formations
- Ajouter/Éditer/Supprimer
- Formulaire avec dates
```

### 4. `/admin/messages` - Consultation des Messages
```typescript
// src/pages/admin/Messages.tsx
- Liste des messages reçus
- Marquer comme lu/non lu
- Supprimer les messages
- Affichage détaillé
```

### 5. `/admin/profile` - Édition du Profil
```typescript
// src/pages/admin/Profile.tsx
- Éditer les informations personnelles
- Upload avatar
- Réseaux sociaux
```

## Structure Commune

Chaque page admin devrait avoir :

```typescript
import { useState, useEffect } from 'react';
import { Button } from '@components/ui/Button';
import { Card, CardContent, CardHeader } from '@components/ui/Card';
import { useAuthStore } from '@stores/authStore';
import { [Entity]API } from '@services/api';
import type { [Entity] } from '../../types';

export function [EntityName]Admin() {
  const [items, setItems] = useState<[Entity][]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await [Entity]API.getAll();
      setItems(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  // Implémentation CRUD...
}
```

## Composants Réutilisables à Créer

### AdminTable
```typescript
// src/components/admin/AdminTable.tsx
- Tableau générique pour lister les données
- Colonnes configurables
- Actions (Éditer, Supprimer)
- Pagination
```

### AdminForm
```typescript
// src/components/admin/AdminForm.tsx
- Formulaire générique
- Validation Zod
- Soumission
- Gestion des erreurs
```

### AdminModal
```typescript
// src/components/admin/AdminModal.tsx
- Modal pour créer/éditer
- Fermeture avec ESC
- Overlay
```

## Routes à Ajouter dans App.tsx

```typescript
<Route path="/admin/dashboard" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin" />} />
<Route path="/admin/projects" element={isAuthenticated ? <AdminProjects /> : <Navigate to="/admin" />} />
<Route path="/admin/certifications" element={isAuthenticated ? <AdminCertifications /> : <Navigate to="/admin" />} />
<Route path="/admin/education" element={isAuthenticated ? <AdminEducation /> : <Navigate to="/admin" />} />
<Route path="/admin/messages" element={isAuthenticated ? <AdminMessages /> : <Navigate to="/admin" />} />
<Route path="/admin/profile" element={isAuthenticated ? <AdminProfile /> : <Navigate to="/admin" />} />
```

## Fonctionnalités à Implémenter

- [ ] Tableau avec tri et pagination
- [ ] Formulaires modaux
- [ ] Validation complète
- [ ] Notifications de succès/erreur
- [ ] Confirmation avant suppression
- [ ] Upload d'images
- [ ] Recherche et filtres
- [ ] Export en CSV
- [ ] Drag & drop pour réorganiser

## Priorité

1. **Haute** : Pages Projects, Certifications, Messages
2. **Moyenne** : Pages Education, Profile
3. **Basse** : Fonctionnalités avancées (export, drag&drop)

## Exemple Complet - AdminProjects

```typescript
import { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Card, CardContent, CardHeader } from '@components/ui/Card';
import { projectsAPI } from '@services/api';
import type { Project } from '../../types';
import Swal from 'sweetalert2';

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Supprimer?',
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1e40af',
    });

    if (result.isConfirmed) {
      try {
        await projectsAPI.delete(id);
        setProjects(projects.filter(p => p.id !== id));
        await Swal.fire('Supprimé!', '', 'success');
      } catch (error) {
        await Swal.fire('Erreur', 'Impossible de supprimer', 'error');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gestion des Projets</h1>
          <Button onClick={() => {/* Ouvrir formulaire */}}>
            <Plus size={18} className="mr-2" /> Ajouter
          </Button>
        </div>

        <div className="grid gap-6">
          {projects.map(project => (
            <Card key={project.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                    <div className="flex gap-2 mt-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 size={16} />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

**Statut** : À faire
**Priorité** : Haute
**Effort estimé** : 8-10 heures
