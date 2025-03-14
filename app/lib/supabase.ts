import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for the projects table
export interface Project {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url?: string;
  technologies: string[];
  featured: boolean;
  order: number;
  category: string;
} 