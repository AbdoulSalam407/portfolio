import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, FileText, Award, BookOpen, MessageSquare, User, Info } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Card, CardContent, CardHeader } from '@components/ui/Card';
import { useAuthStore } from '@stores/authStore';
import { projectsAPI, certificationsAPI, educationAPI, messagesAPI, statsAPI } from '@services/api';
import type { Stats } from '@/types';

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const logout = useAuthStore((state: any) => state.logout);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, messagesRes] = await Promise.all([
        statsAPI.get().catch(() => null),
        messagesAPI.getAll()
      ]);
      
      const totalMessages = messagesRes.data.length;
      
      if (statsRes) {
        console.log('Stats reçues:', statsRes.data);
        setStats(statsRes.data);
      } else {
        // Fallback: charger les données manuellement
        const projectsRes = await projectsAPI.getAll();
        const certificationsRes = await certificationsAPI.getAll();
        const educationRes = await educationAPI.getAll();
        
        const techMap: { [key: string]: number } = {};
        projectsRes.data.forEach(project => {
          if (project.technologies && Array.isArray(project.technologies)) {
            project.technologies.forEach(tech => {
              techMap[tech] = (techMap[tech] || 0) + 1;
            });
          }
        });
        
        const technologies = Object.entries(techMap).map(([name, count]) => ({
          name,
          count
        })).sort((a, b) => b.count - a.count);
        
        setStats({
          totalProjects: projectsRes.data.length,
          totalCertifications: certificationsRes.data.length,
          totalEducation: educationRes.data.length,
          totalMessages,
          technologies
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      icon: FileText,
      label: 'Projets',
      value: stats?.totalProjects || 0,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      icon: Award,
      label: 'Attestations',
      value: stats?.totalCertifications || 0,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      icon: BookOpen,
      label: 'Formations',
      value: stats?.totalEducation || 0,
      color: 'bg-green-100 text-green-700',
    },
    {
      icon: MessageSquare,
      label: 'Messages',
      value: stats?.totalMessages || 0,
      color: 'bg-orange-100 text-orange-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Tableau de Bord Admin</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={18} /> Déconnexion
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Modifier le Profil',
              description: 'Éditer vos informations personnelles',
              icon: User,
              link: '/admin/profile',
            },
            {
              title: 'Gestion des Projets',
              description: 'Créer, modifier ou supprimer des projets',
              icon: FileText,
              link: '/admin/projects',
            },
            {
              title: 'Gestion des Attestations',
              description: 'Gérer vos certifications et attestations',
              icon: Award,
              link: '/admin/certifications',
            },
            {
              title: 'Gestion des Formations',
              description: 'Éditer votre parcours éducatif',
              icon: BookOpen,
              link: '/admin/education',
            },
            {
              title: 'Messages Reçus',
              description: 'Consulter les messages de contact',
              icon: MessageSquare,
              link: '/admin/messages',
            },
            {
              title: 'Modifier À Propos',
              description: 'Éditer la page À propos de moi',
              icon: Info,
              link: '/admin/about',
            },
          ].map((section) => (
            <Card key={section.title} hover>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <section.icon className="text-primary-700" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="primary" size="sm" onClick={() => navigate(section.link)}>
                  Accéder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technologies Chart */}
        {stats?.technologies && stats.technologies.length > 0 && (
          <Card className="mt-12">
            <CardHeader>
              <h3 className="text-xl font-semibold">Technologies Utilisées</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(() => {
                  const maxCount = Math.max(...stats.technologies.map((t) => t.count), 1);
                  return stats.technologies.map((tech) => (
                    <div key={tech.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 font-medium">{tech.name}</span>
                        <span className="text-gray-600">{tech.count} projets</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-700 h-2 rounded-full"
                          style={{ width: `${(tech.count / maxCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
