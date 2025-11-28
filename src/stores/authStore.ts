import { create } from 'zustand';
import type { AuthState } from '../types';

const ADMIN_PASSWORD = 'AsdGoby781209169#';

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (password === ADMIN_PASSWORD) {
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
