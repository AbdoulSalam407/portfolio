import { useState, useEffect } from 'react';
import { Card, CardContent } from '@components/ui/Card';
import { profileAPI } from '@services/api';
import type { Profile } from '@/types/index';

export function About() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await profileAPI.get();
      setProfile(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Chargement...</div>;
  }

  const aboutContent = profile?.aboutContent || {
    title: 'À Propos de Moi',
    subtitle: 'Développeur Full Stack passionné par la création d\'applications web modernes et performantes',
    whoAmI: 'Je suis un développeur full stack avec plus de 5 ans d\'expérience dans la création d\'applications web.',
    approach: 'Mon approche combine une attention particulière au design, à l\'expérience utilisateur et à la qualité du code.',
    hobby: 'Quand je ne code pas, vous me trouverez en train de lire des articles tech, contribuer à des projets open-source ou explorer de nouveaux frameworks.',
    stats: {
      projects: 50,
      clients: 30,
      experience: 5,
    },
    values: [
      { title: 'Qualité', description: 'Je m\'engage à livrer du code propre, maintenable et performant' },
      { title: 'Innovation', description: 'Je reste à jour avec les dernières technologies et bonnes pratiques' },
      { title: 'Collaboration', description: 'Je crois au pouvoir du travail en équipe et de la communication' },
    ],
    skills: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
      { category: 'Tools', items: ['Git', 'Docker', 'Vite', 'Jest'] },
    ],
  };

  const skills = aboutContent.skills;

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4">{aboutContent.title || 'À Propos de Moi'}</h1>
        <p className="text-gray-600 mb-12 text-lg">
          {aboutContent.subtitle || 'Développeur Full Stack passionné par la création d\'applications web modernes et performantes'}
        </p>

        {/* Bio Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-4">Qui suis-je?</h2>
            <p className="text-gray-600 mb-4">
              {aboutContent.whoAmI}
            </p>
            <p className="text-gray-600 mb-4">
              {aboutContent.approach}
            </p>
            <p className="text-gray-600">
              {aboutContent.hobby}
            </p>
          </div>

          <div className="bg-primary-700 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Statistiques</h3>
            <div className="space-y-4">
              <div>
                <div className="text-4xl font-bold">{aboutContent.stats.projects}+</div>
                <p className="text-primary-100">Projets complétés</p>
              </div>
              <div>
                <div className="text-4xl font-bold">{aboutContent.stats.clients}+</div>
                <p className="text-primary-100">Clients satisfaits</p>
              </div>
              <div>
                <div className="text-4xl font-bold">{aboutContent.stats.experience}+</div>
                <p className="text-primary-100">Années d'expérience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <h2 className="text-2xl font-bold mb-8">Compétences</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skills.map((skillGroup) => (
            <Card key={skillGroup.category}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-primary-700 rounded-full"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Section */}
        <h2 className="text-2xl font-bold mb-8">Mes Valeurs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {aboutContent.values.map((value) => (
            <Card key={value.title}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
