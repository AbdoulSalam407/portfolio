import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Plus, ArrowLeft, X } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Card, CardContent } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { educationAPI } from '@services/api';
import type { Education } from '@/types';
import Swal from 'sweetalert2';

export function AdminEducation() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      const response = await educationAPI.getAll();
      
      // Gérer le format de réponse paginée
      let educationData: any = response.data;
      if (educationData.results && Array.isArray(educationData.results)) {
        educationData = educationData.results;
      } else if (!Array.isArray(educationData)) {
        educationData = [];
      }
      
      setEducation(educationData);
    } catch (error) {
      console.error('Erreur:', error);
      await Swal.fire('Erreur', 'Impossible de charger les formations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Supprimer cette formation?',
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1e40af',
      cancelButtonColor: '#6b7280',
    });

    if (result.isConfirmed) {
      try {
        await educationAPI.delete(id);
        setEducation(education.filter(e => e.id !== id));
        await Swal.fire('Supprimée!', 'La formation a été supprimée', 'success');
      } catch (error) {
        await Swal.fire('Erreur', 'Impossible de supprimer la formation', 'error');
      }
    }
  };

  const handleOpenForm = (edu?: Education) => {
    if (edu) {
      setEditingId(edu.id);
      setFormData({
        school: edu.school,
        degree: edu.degree,
        field: edu.field,
        startDate: edu.startDate,
        endDate: edu.endDate,
        description: edu.description,
      });
    } else {
      setEditingId(null);
      setFormData({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: '',
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
      if (editingId) {
        await educationAPI.update(editingId, formData);
        setEducation(education.map(e => e.id === editingId ? { ...e, ...formData } : e));
        await Swal.fire('Succès!', 'La formation a été mise à jour', 'success');
      } else {
        const response = await educationAPI.create(formData as Omit<Education, 'id'>);
        setEducation([...education, response.data]);
        await Swal.fire('Succès!', 'La formation a été créée', 'success');
      }
      handleCloseForm();
    } catch (error) {
      await Swal.fire('Erreur', 'Impossible de sauvegarder la formation', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des formations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-3xl font-bold">Gestion des Formations</h1>
          </div>
          <Button onClick={() => handleOpenForm()}>
            <Plus size={18} className="mr-2" /> Ajouter
          </Button>
        </div>

        {/* Education List */}
        <div className="space-y-4">
          {education.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-600">
                Aucune formation trouvée
              </CardContent>
            </Card>
          ) : (
            education.map((edu, index) => (
              <Card key={edu.id} hover>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-700 text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{edu.degree}</h3>
                          <p className="text-primary-700 font-medium">{edu.school}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{edu.field}</p>
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                      </p>
                      <p className="text-gray-700">{edu.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenForm(edu)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(edu.id)}
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
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-bold">
                  {editingId ? 'Éditer la formation' : 'Ajouter une formation'}
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
                  label="École/Université"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  required
                />
                <Input
                  label="Diplôme"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  required
                />
                <Input
                  label="Domaine"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  required
                />
                <Input
                  label="Date de début"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
                <Input
                  label="Date de fin"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
                <Input
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />

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
