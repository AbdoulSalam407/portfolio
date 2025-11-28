import { useEffect, useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Dribbble, Globe, GitBranch } from 'lucide-react';
import { profileAPI } from '@services/api';
import type { Profile } from '../../types';

export function Footer() {
  const currentYear = new Date().getFullYear();
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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">À propos</h3>
            <p className="text-gray-400 text-sm">
              {profile?.aboutMe || profile?.bio || 'Développeur Full Stack passionné par la création d\'applications modernes.'}
            </p>
            {profile && (
              <div className="mt-4 space-y-2 text-sm text-gray-400">
                {profile.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                      {profile.email}
                    </a>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="/projects" className="hover:text-white transition-colors">Projets</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tutoriels</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Réseaux Sociaux</h4>
            {profile && profile.socialLinks && profile.socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {profile.socialLinks.map((link: { platform: string; url: string }, index: number) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-primary-600 text-gray-400 hover:text-white rounded-lg transition-all duration-300"
                    title={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            © {currentYear} {profile?.name || 'Abdoul Salam Diallo'}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
