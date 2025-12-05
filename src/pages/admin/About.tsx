import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Input, Textarea } from '@components/ui/Input';
import { profileAPI } from '@services/api';
import Swal from 'sweetalert2';

interface AboutContent {
  title?: string;
  subtitle?: string;
  whoAmI: string;
  approach: string;
  hobby: string;
  stats: {
    projects: number;
    clients: number;
    experience: number;
  };
  values: Array<{
    title: string;
    description: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
}

export function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AboutContent>({
    whoAmI: '',
    approach: '',
    hobby: '',
    stats: {
      projects: 50,
      clients: 30,
      experience: 5,
    },
    values: [
      { title: 'Qualité', description: '' },
      { title: 'Innovation', description: '' },
      { title: 'Collaboration', description: '' },
    ],
    skills: [
      { category: 'Frontend', items: [] },
      { category: 'Backend', items: [] },
      { category: 'Tools', items: [] },
    ],
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.get();
      
      // Gérer le format de réponse paginée
      let profileData: any = response.data;
      if (profileData.results && Array.isArray(profileData.results)) {
        profileData = profileData.results[0];
      }
      
      // Charger les données existantes ou utiliser les valeurs par défaut
      const existingAboutContent = profileData?.aboutContent;
      const aboutContent: AboutContent = {
        title: existingAboutContent?.title || 'À Propos de Moi',
        subtitle: existingAboutContent?.subtitle || 'Développeur Full Stack passionné',
        whoAmI: existingAboutContent?.whoAmI || 'Je suis un développeur full stack avec plus de 5 ans d\'expérience dans la création d\'applications web.',
        approach: existingAboutContent?.approach || 'Mon approche combine une attention particulière au design, à l\'expérience utilisateur et à la qualité du code.',
        hobby: existingAboutContent?.hobby || 'Quand je ne code pas, vous me trouverez en train de lire des articles tech, contribuer à des projets open-source ou explorer de nouveaux frameworks.',
        stats: existingAboutContent?.stats || {
          projects: 50,
          clients: 30,
          experience: 5,
        },
        values: existingAboutContent?.values || [
          { title: 'Qualité', description: 'Je m\'engage à livrer du code propre, maintenable et performant' },
          { title: 'Innovation', description: 'Je reste à jour avec les dernières technologies et bonnes pratiques' },
          { title: 'Collaboration', description: 'Je crois au pouvoir du travail en équipe et de la communication' },
        ],
        skills: existingAboutContent?.skills || [
          { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
          { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
          { category: 'Tools', items: ['Git', 'Docker', 'Vite', 'Jest'] },
          { category: 'Data Engineering', items: ['Python', 'SQL', 'ETL', 'Airflow', 'Spark', 'Data Warehousing'] },
          { category: 'Data Science', items: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'Visualisation de données'] },
          { category: 'Data Analyst', items: ['SQL', 'Power BI', 'Excel', 'Data Visualisation', 'Reporting'] },
        ],
      };

      setFormData(aboutContent);
    } catch (error) {
      console.error('Erreur lors du chargement du contenu À propos:', error);
      Swal.fire('Erreur', 'Impossible de charger le contenu À propos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await profileAPI.get();
      
      const updatedProfile = {
        ...response.data,
        aboutContent: formData,
      };

      await profileAPI.update(updatedProfile);

      Swal.fire('Succès', 'Contenu À propos mis à jour avec succès', 'success');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      Swal.fire('Erreur', 'Impossible de mettre à jour le contenu', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier la page À Propos</h1>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow">
          {/* Section Titre et Sous-titre */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Titre et Sous-titre</h2>
            <div className="space-y-4">
              <Input
                label="Titre principal"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: À Propos de Moi"
              />
              <Textarea
                label="Sous-titre"
                value={formData.subtitle || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Ex: Développeur Full Stack passionné..."
                rows={2}
              />
            </div>
          </div>

          {/* Section Qui suis-je */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Qui suis-je?</h2>
            <Textarea
              label="Description principale"
              value={formData.whoAmI}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, whoAmI: e.target.value })}
              placeholder="Décrivez qui vous êtes..."
              rows={4}
            />
          </div>

          {/* Section Approche */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mon Approche</h2>
            <Textarea
              label="Approche et philosophie"
              value={formData.approach}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, approach: e.target.value })}
              placeholder="Décrivez votre approche..."
              rows={4}
            />
          </div>

          {/* Section Loisirs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loisirs</h2>
            <Textarea
              label="Quand je ne code pas"
              value={formData.hobby}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, hobby: e.target.value })}
              placeholder="Parlez de vos loisirs..."
              rows={4}
            />
          </div>

          {/* Section Statistiques */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Statistiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Projets complétés"
                type="number"
                value={formData.stats?.projects || 50}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...(formData.stats || {}), projects: parseInt(e.target.value) },
                  })
                }
              />
              <Input
                label="Clients satisfaits"
                type="number"
                value={formData.stats?.clients || 30}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...(formData.stats || {}), clients: parseInt(e.target.value) },
                  })
                }
              />
              <Input
                label="Années d'expérience"
                type="number"
                value={formData.stats?.experience || 5}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stats: { ...(formData.stats || {}), experience: parseInt(e.target.value) },
                  })
                }
              />
            </div>
          </div>

          {/* Section Valeurs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mes Valeurs</h2>
            <div className="space-y-4">
              {(formData.values || []).map((value, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {value.title}
                  </label>
                  <Textarea
                    value={value.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const newValues = [...(formData.values || [])];
                      newValues[index].description = e.target.value;
                      setFormData({ ...formData, values: newValues });
                    }}
                    placeholder={`Décrivez la valeur "${value.title}"...`}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section Compétences */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compétences</h2>
            <div className="space-y-6">
              {(formData.skills || []).map((skillGroup, groupIndex) => (
                <div key={groupIndex}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {skillGroup.category}
                  </label>
                  <Textarea
                    value={(skillGroup.items || []).join(', ')}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      const newSkills = [...(formData.skills || [])];
                      newSkills[groupIndex].items = e.target.value
                        .split(',')
                        .map((item: string) => item.trim())
                        .filter((item: string) => item);
                      setFormData({ ...formData, skills: newSkills });
                    }}
                    placeholder="Entrez les compétences séparées par des virgules..."
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Boutons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
            <Button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-900"
            >
              Annuler
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
