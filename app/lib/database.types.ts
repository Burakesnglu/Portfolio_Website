export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          images: string[]
          project_url: string | null
          github_url: string | null
          technologies: string[]
          featured: boolean
          order: number | null
          category: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          images: string[]
          project_url?: string | null
          github_url?: string | null
          technologies: string[]
          featured?: boolean
          order?: number | null
          category?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          images?: string[]
          project_url?: string | null
          github_url?: string | null
          technologies?: string[]
          featured?: boolean
          order?: number | null
          category?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 