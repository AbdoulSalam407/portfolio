import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Card, CardContent, CardHeader } from '@components/ui/Card';
import { Input, Textarea, ImageUpload } from '@components/ui/Input';
import { profileAPI } from '@services/api';
import Swal from 'sweetalert2';

export function AdminProfile() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    aboutMe: '',
    email: '',
    phone: '',
    location: '',
    avatar: '',
    socialLinks: [
      { platform: '', url: '' },
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.get();
      setFormData({
        name: response.data.name || '',
        title: response.data.title || '',
        bio: response.data.bio || '',
        aboutMe: response.data.aboutMe || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        location: response.data.location || '',
        avatar: response.data.avatar || '',
        socialLinks: response.data.socialLinks || [{ platform: '', url: '' }],
      });
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      Swal.fire('Erreur', 'Impossible de charger le profil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      Swal.fire('Erreur', 'Le nom est requis', 'error');
      return;
    }

    try {
      setIsSubmitting(true);
      await profileAPI.update(formData);
      Swal.fire('Succès', 'Profil mis à jour avec succès', 'success');
      loadProfile();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      Swal.fire('Erreur', 'Impossible de mettre à jour le profil', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { platform: '', url: '' }],
    });
  };

  const handleRemoveSocialLink = (index: number) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== index),
    });
  };

  const handleSocialLinkChange = (index: number, field: 'platform' | 'url', value: string) => {
    const newSocialLinks = [...formData.socialLinks];
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value };
    setFormData({ ...formData, socialLinks: newSocialLinks });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Modifier le Profil</h1>
          </div>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Informations Personnelles</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div>
                <ImageUpload
                  label="Avatar"
                  value={formData.avatar}
                  onChange={(url) => setFormData({ ...formData, avatar: url })}
                  preview
                />
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <Input
                  label="Titre"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="ex: Développeur Full Stack"
                />
              </div>

              <Textarea
                label="Bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Parlez un peu de vous..."
                rows={4}
              />

              <Textarea
                label="À propos de moi"
                value={formData.aboutMe}
                onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                placeholder="Décrivez votre parcours, vos expériences et vos objectifs..."
                rows={6}
              />

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  label="Téléphone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <Input
                label="Localisation"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="ex: Paris, France"
              />

              {/* Social Links */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Réseaux Sociaux</h3>
                  <button
                    type="button"
                    onClick={handleAddSocialLink}
                    className="flex items-center gap-2 px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.socialLinks.map((link, index) => (
                    <div key={index} className="flex gap-3 items-end">
                      <Input
                        label={index === 0 ? 'Plateforme' : ''}
                        value={link.platform}
                        onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                        placeholder="ex: github, linkedin, twitter"
                        className="flex-1"
                      />
                      <Input
                        label={index === 0 ? 'URL' : ''}
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                        placeholder="https://..."
                        className="flex-1"
                      />
                      {formData.socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSocialLink(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/admin/dashboard')}
                >
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
