import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Plus, ArrowLeft, X, Upload } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Card, CardContent } from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { certificationsAPI } from '@services/api';
import type { Certification } from '@/types';
import Swal from 'sweetalert2';

export function AdminCertifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    image: '',
    skills: '',
  });
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadCertifications();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData({ ...formData, image: base64 });
    };
    reader.readAsDataURL(file);
  };

  const loadCertifications = async () => {
    try {
      const response = await certificationsAPI.getAll();
      
      // Gérer le format de réponse paginée
      let certsData: any = response.data;
      if (certsData.results && Array.isArray(certsData.results)) {
        certsData = certsData.results;
      } else if (!Array.isArray(certsData)) {
        certsData = [];
      }
      
      setCerts(certsData);
    } catch (error) {
      console.error('Erreur:', error);
      await Swal.fire('Erreur', 'Impossible de charger les attestations', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Supprimer cette attestation?',
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1e40af',
      cancelButtonColor: '#6b7280',
    });

    if (result.isConfirmed) {
      try {
        await certificationsAPI.delete(id);
        setCerts(certs.filter(c => c.id !== id));
        await Swal.fire('Supprimée!', 'L\'attestation a été supprimée', 'success');
      } catch (error) {
        await Swal.fire('Erreur', 'Impossible de supprimer l\'attestation', 'error');
      }
    }
  };

  const handleOpenForm = (cert?: Certification) => {
    if (cert) {
      setEditingId(cert.id);
      setFormData({
        title: cert.title,
        issuer: cert.issuer,
        issueDate: cert.issueDate,
        image: cert.image,
        skills: cert.skills?.join(', ') || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        issuer: '',
        issueDate: '',
        image: '',
        skills: '',
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
      const certData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
      };

      if (editingId) {
        await certificationsAPI.update(editingId, certData);
        setCerts(certs.map(c => c.id === editingId ? { ...c, ...certData } : c));
        await Swal.fire('Succès!', 'L\'attestation a été mise à jour', 'success');
      } else {
        const response = await certificationsAPI.create(certData as Omit<Certification, 'id'>);
        setCerts([...certs, response.data]);
        await Swal.fire('Succès!', 'L\'attestation a été créée', 'success');
      }
      handleCloseForm();
    } catch (error) {
      await Swal.fire('Erreur', 'Impossible de sauvegarder l\'attestation', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des attestations...</p>
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
            <h1 className="text-3xl font-bold">Gestion des Attestations</h1>
          </div>
          <Button onClick={() => handleOpenForm()}>
            <Plus size={18} className="mr-2" /> Ajouter
          </Button>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-gray-600">
                Aucune attestation trouvée
              </CardContent>
            </Card>
          ) : (
            certs.map(cert => (
              <Card key={cert.id} hover>
                <div className="h-40 bg-gray-200 overflow-hidden rounded-t-lg">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
                  <p className="text-primary-700 font-medium text-sm mb-2">{cert.issuer}</p>
                  <p className="text-xs text-gray-600 mb-3">
                    {new Date(cert.issueDate).toLocaleDateString('fr-FR')}
                  </p>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map(skill => (
                          <span key={skill} className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleOpenForm(cert)}
                    >
                      <Edit2 size={14} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDelete(cert.id)}
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </Button>
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
                  {editingId ? 'Éditer l\'attestation' : 'Ajouter une attestation'}
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
                  label="Émetteur"
                  value={formData.issuer}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  required
                />
                <Input
                  label="Date d'émission"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image de l'attestation
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="flex-1"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3"
                    >
                      <Upload size={18} />
                    </Button>
                  </div>
                </div>
                <Input
                  label="Compétences (séparées par des virgules)"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
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
