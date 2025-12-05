import { create } from 'zustand';
import type { AuthState } from '../types';
import { profileAPI } from '@services/api';

interface AuthStore extends AuthState {
  login: (password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  login: async (password: string) => {
    set({ loading: true, error: null });
    try {
      // Récupérer le mot de passe admin depuis l'API
      const response = await profileAPI.get();
      
      // Gérer le format de réponse (peut être un objet ou une liste)
      let profileData: any = response.data;
      if (Array.isArray(profileData) && profileData.length > 0) {
        profileData = profileData[0];
      } else if (profileData.results && Array.isArray(profileData.results)) {
        profileData = profileData.results[0];
      }
      
      const adminPassword = profileData.adminPassword;

      if (adminPassword && password === adminPassword) {
        const user = { id: '1', email: 'admin@portfolio.com' };
        localStorage.setItem('auth_token', 'token_' + Date.now());
        localStorage.setItem('user', JSON.stringify(user));
        set({ isAuthenticated: true, user, loading: false });
      } else {
        throw new Error('Mot de passe incorrect');
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erreur de connexion',
        loading: false,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null, error: null });
  },

  checkAuth: () => {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');

    if (token && user) {
      try {
        set({ isAuthenticated: true, user: JSON.parse(user) });
      } catch {
        set({ isAuthenticated: false, user: null });
      }
    }
  },
}));
