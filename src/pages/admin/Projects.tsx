import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Plus, ArrowLeft, X } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Card, CardContent } from '@components/ui/Card';
import { Input, ImageUpload } from '@components/ui/Input';
import { projectsAPI } from '@services/api';
import type { Project } from '@/types';
import Swal from 'sweetalert2';

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubUrl: '',
    liveUrl: '',
    category: 'web',
    featured: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      await Swal.fire('Erreur', 'Impossible de charger les projets', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Supprimer ce projet?',
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1e40af',
      cancelButtonColor: '#6b7280',
    });

    if (result.isConfirmed) {
      try {
        await projectsAPI.delete(id);
        setProjects(projects.filter(p => p.id !== id));
        await Swal.fire('Supprimé!', 'Le projet a été supprimé', 'success');
      } catch (error) {
        await Swal.fire('Erreur', 'Impossible de supprimer le projet', 'error');
      }
    }
  };

  const handleOpenForm = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        technologies: project.technologies.join(', '),
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        category: project.category,
        featured: project.featured,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        category: 'web',
        featured: false,
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        category: formData.category as 'web' | 'mobile' | 'data' | 'other',
      };

      if (editingId) {
        await projectsAPI.update(editingId, projectData as Partial<Project>);
        setProjects(projects.map(p => p.id === editingId ? { ...p, ...projectData } : p) as Project[]);
        await Swal.fire('Succès!', 'Le projet a été mis à jour', 'success');
      } else {
        const response = await projectsAPI.create(projectData as Omit<Project, 'id'>);
        setProjects([...projects, response.data]);
        await Swal.fire('Succès!', 'Le projet a été créé', 'success');
      }
      handleCloseForm();
    } catch (error) {
      await Swal.fire('Erreur', 'Impossible de sauvegarder le projet', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des projets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-3xl font-bold">Gestion des Projets</h1>
          </div>
          <Button onClick={() => handleOpenForm()}>
            <Plus size={18} className="mr-2" /> Ajouter
          </Button>
        </div>

        {/* Projects List */}
        <div className="grid gap-6">
          {projects.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-600">
                Aucun projet trouvé
              </CardContent>
            </Card>
          ) : (
            projects.map(project => (
              <Card key={project.id} hover>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        Catégorie: <span className="font-medium">{project.category}</span>
                        {project.featured && <span className="ml-3 text-yellow-600">⭐ En vedette</span>}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenForm(project)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-bold">
                  {editingId ? 'Éditer le projet' : 'Ajouter un projet'}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="p-1 hover:bg-gray-100 rounded"
                  disabled={isSubmitting}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Input
                  label="Titre"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                <Input
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
                <ImageUpload
                  label="Image du projet"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  preview
                />
                <Input
                  label="Technologies (séparées par des virgules)"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  required
                />
                <Input
                  label="URL GitHub"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  required
                />
                <Input
                  label="URL de démonstration"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                />
                <Input
                  label="Catégorie"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">En vedette</label>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseForm}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="flex-1"
                  >
                    {editingId ? 'Mettre à jour' : 'Créer'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
