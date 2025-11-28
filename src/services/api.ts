import axios from 'axios';
import type { Project, Certification, Education, Message, Profile, Stats } from '../types';

const API_BASE_URL = 'https://api-porfolio-meiq.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects
export const projectsAPI = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: string) => api.get<Project>(`/projects/${id}`),
  create: (data: Omit<Project, 'id'>) => api.post<Project>('/projects', data),
  update: (id: string, data: Partial<Project>) => api.put<Project>(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

// Certifications
export const certificationsAPI = {
  getAll: () => api.get<Certification[]>('/certifications'),
  getById: (id: string) => api.get<Certification>(`/certifications/${id}`),
  create: (data: Omit<Certification, 'id'>) => api.post<Certification>('/certifications', data),
  update: (id: string, data: Partial<Certification>) => api.put<Certification>(`/certifications/${id}`, data),
  delete: (id: string) => api.delete(`/certifications/${id}`),
};

// Education
export const educationAPI = {
  getAll: () => api.get<Education[]>('/education'),
  getById: (id: string) => api.get<Education>(`/education/${id}`),
  create: (data: Omit<Education, 'id'>) => api.post<Education>('/education', data),
  update: (id: string, data: Partial<Education>) => api.put<Education>(`/education/${id}`, data),
  delete: (id: string) => api.delete(`/education/${id}`),
};

// Messages
export const messagesAPI = {
  getAll: () => api.get<Message[]>('/messages'),
  getById: (id: string) => api.get<Message>(`/messages/${id}`),
  create: (data: Omit<Message, 'id' | 'createdAt' | 'read'>) =>
    api.post<Message>('/messages', {
      ...data,
      createdAt: new Date().toISOString(),
      read: false,
    }),
  update: (id: string, data: Partial<Message>) => api.put<Message>(`/messages/${id}`, data),
  markAsRead: (id: string) => api.patch<Message>(`/messages/${id}`, { read: true }),
  delete: (id: string) => api.delete(`/messages/${id}`),
};

// Profile
export const profileAPI = {
  get: () => api.get<Profile>('/profile'),
  update: (data: Partial<Profile>) => api.put<Profile>('/profile', data),
};

// Stats
export const statsAPI = {
  get: () => api.get<Stats>('/stats'),
};

// Image Upload
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{ url: string }>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;
