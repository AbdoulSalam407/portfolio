import { useEffect, useState } from 'react';
import { profileAPI } from '@services/api';
import type { Profile } from '../../types';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileAPI.get();
        
        // Gérer le format de réponse paginée
        let profileData: any = response.data;
        if (Array.isArray(profileData) && profileData.length > 0) {
          profileData = profileData[0];
        } else if (profileData.results && Array.isArray(profileData.results)) {
          profileData = profileData.results[0];
        }
        
        setProfile(profileData);
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    };

    // Charger le profil au montage
    loadProfile();

    // Recharger le profil toutes les 5 secondes pour les mises à jour en temps réel
    const interval = setInterval(loadProfile, 5000);

    // Nettoyer l'intervalle au démontage
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {profile?.name || 'Portfolio'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {profile?.bio || 'Développeur Full Stack passionné par la création d\'applications web modernes et performantes.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Accueil
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  À propos
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Projets
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Ressources</h4>
            <ul className="space-y-3">
              <li>
                <a href="/projects" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Mes Projets
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Compétences
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Me Contacter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent mb-8 opacity-30"></div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} <span className="font-semibold text-white">Abdoul Salam Diallo</span>. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300 text-sm">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
