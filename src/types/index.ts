export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'web' | 'mobile' | 'data' | 'other';
  featured: boolean;
  createdAt: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  image: string;
  credentialUrl?: string;
  skills: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface Profile {
  id: number;
  name: string;
  title: string;
  bio: string;
  aboutMe?: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  socialLinks: Array<{
    platform: string;
    url: string;
  }>;
  aboutContent?: {
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
  };
}

export interface Stats {
  totalProjects: number;
  totalCertifications: number;
  totalEducation: number;
  totalMessages: number;
  technologies: Array<{
    name: string;
    count: number;
  }>;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; email: string };
  loading: boolean;
  error: string | null;
}
