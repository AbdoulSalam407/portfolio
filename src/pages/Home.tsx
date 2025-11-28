import { ArrowRight, Code2, Zap, Users, Github, Linkedin, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Youtube, Dribbble, Globe, GitBranch } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { profileAPI } from '@services/api';
import type { Profile } from '../types';

export function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileAPI.get();
        setProfile(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    };

    loadProfile();
  }, []);

  const getSocialIcon = (platform: string) => {
    const iconProps = { size: 20 };
    const platformLower = platform.toLowerCase().trim();

    const iconMap: { [key: string]: React.ReactNode } = {
      github: <Github {...iconProps} />,
      gitlab: <GitBranch {...iconProps} />,
      linkedin: <Linkedin {...iconProps} />,
      twitter: <Twitter {...iconProps} />,
      x: <Twitter {...iconProps} />,
      facebook: <Facebook {...iconProps} />,
      instagram: <Instagram {...iconProps} />,
      youtube: <Youtube {...iconProps} />,
      dribbble: <Dribbble {...iconProps} />,
      email: <Mail {...iconProps} />,
      website: <Globe {...iconProps} />,
      portfolio: <Globe {...iconProps} />,
    };

    return iconMap[platformLower] || <Globe {...iconProps} />;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 flex items-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              {profile ? (
                <>
                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 rounded-full text-sm font-semibold border border-primary-500/30">
                      👋 Bienvenue
                    </span>
                  </div>
                  
                  <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight">
                    {profile.name}
                  </h1>
                  <p className="text-2xl text-primary-300 font-semibold mb-6">
                    {profile.title}
                  </p>
                  <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-lg">
                    {profile.bio}
                  </p>
                  
                  {/* Contact Info */}
                  <div className="space-y-4 mb-10 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                    {profile.email && (
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-500/20 rounded-lg">
                          <Mail size={20} className="text-primary-300" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                          <a href={`mailto:${profile.email}`} className="text-white hover:text-primary-300 transition-colors font-medium">
                            {profile.email}
                          </a>
                        </div>
                      </div>
                    )}
                    {profile.phone && (
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-500/20 rounded-lg">
                          <Phone size={20} className="text-primary-300" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Téléphone</p>
                          <span className="text-white font-medium">{profile.phone}</span>
                        </div>
                      </div>
                    )}
                    {profile.location && (
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-500/20 rounded-lg">
                          <MapPin size={20} className="text-primary-300" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide">Localisation</p>
                          <span className="text-white font-medium">{profile.location}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  {profile.socialLinks && profile.socialLinks.length > 0 && (
                    <div className="flex gap-4 mb-10">
                      {profile.socialLinks.map((link: { platform: string; url: string }, index: number) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 hover:bg-primary-500 text-white rounded-lg transition-all duration-300 border border-white/20 hover:border-primary-500"
                          title={link.platform}
                        >
                          {getSocialIcon(link.platform)}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
                    Développeur Full Stack
                  </h1>
                  <p className="text-xl text-gray-300 mb-8">
                    Créer des applications web modernes, performantes et scalables avec React, Node.js et TypeScript.
                  </p>
                </>
              )}
              
              <div className="flex gap-4">
                <Link to="/projects">
                  <Button size="lg" className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white">
                    Voir mes projets <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    Me contacter
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center">
              {profile && profile.avatar ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-blue-500 rounded-2xl blur-2xl opacity-30"></div>
                  <div className="relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden border-2 border-white/10">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl shadow-2xl flex items-center justify-center border border-white/10">
                  <Code2 size={120} className="text-white opacity-20" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Mes compétences</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: 'Frontend Moderne',
                description: 'React, TypeScript, Tailwind CSS pour des interfaces fluides et réactives',
              },
              {
                icon: Zap,
                title: 'Performance',
                description: 'Optimisation, code splitting, lazy loading pour une expérience utilisateur optimale',
              },
              {
                icon: Users,
                title: 'Collaboration',
                description: 'Travail en équipe, Git, agile pour des projets de qualité',
              },
            ].map((feature, index) => (
              <div key={index} className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 text-primary-700 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à collaborer?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contactez-moi pour discuter de votre prochain projet
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              Démarrer une conversation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
