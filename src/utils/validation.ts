import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Le titre est requis').max(100),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères').max(1000),
  image: z.string().url('URL invalide'),
  technologies: z.array(z.string()).min(1, 'Au moins une technologie est requise'),
  githubUrl: z.string().url('URL GitHub invalide').optional().or(z.literal('')),
  liveUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  category: z.enum(['web', 'mobile', 'data', 'other']),
  featured: z.boolean().default(false),
  createdAt: z.string().datetime(),
});

export const CertificationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Le titre est requis').max(100),
  issuer: z.string().min(1, 'L\'émetteur est requis'),
  issueDate: z.string(),
  expiryDate: z.string().optional(),
  image: z.string().url('URL invalide'),
  credentialUrl: z.string().url('URL invalide').optional().or(z.literal('')),
  skills: z.array(z.string()).min(1, 'Au moins une compétence est requise'),
});

export const EducationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, 'L\'école est requise'),
  degree: z.string().min(1, 'Le diplôme est requis'),
  field: z.string().min(1, 'Le domaine est requis'),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
});

export const MessageSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  subject: z.string().min(5, 'Le sujet doit contenir au moins 5 caractères').max(100),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(5000),
  honeypot: z.string().optional(),
});

export const ProfileSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  title: z.string().min(1, 'Le titre est requis'),
  bio: z.string().min(10, 'La bio doit contenir au moins 10 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Le numéro de téléphone est invalide'),
  location: z.string().min(1, 'La localisation est requise'),
  avatar: z.string().url('URL invalide'),
});

export const LoginSchema = z.object({
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
export type CertificationInput = z.infer<typeof CertificationSchema>;
export type EducationInput = z.infer<typeof EducationSchema>;
export type MessageInput = z.infer<typeof MessageSchema>;
export type ProfileInput = z.infer<typeof ProfileSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
