import { z } from 'zod';

// Project form validation schema
export const projectSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur'),
  description: z.string().nullable(),
  images: z.array(z.string().url('Geçerli bir URL giriniz')),
  project_url: z.string().url('Geçerli bir URL giriniz').nullable(),
  github_url: z.string().url('Geçerli bir URL giriniz').nullable(),
  technologies: z.array(z.string()),
  featured: z.boolean(),
  order: z.number().nullable(),
  category: z.string().nullable(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// Login form validation schema
export const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi giriniz'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormValues = z.infer<typeof contactSchema>; 