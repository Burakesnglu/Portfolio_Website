import { z } from 'zod';

// Project form validation schema
export const projectSchema = z.object({
  title: z.string().min(1, 'Proje başlığı gereklidir'),
  description: z.string().optional(),
  image_url: z.string().url('Geçerli bir URL giriniz').optional().nullable(),
  project_url: z.string().url('Geçerli bir URL giriniz').optional().nullable(),
  github_url: z.string().url('Geçerli bir URL giriniz').optional().nullable(),
  technologies: z.array(z.string()),
  featured: z.boolean().default(false),
  order: z.number().optional().nullable(),
  category: z.string().optional().nullable(),
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