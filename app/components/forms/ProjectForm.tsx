'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormValues } from '@/app/lib/validators';
import { Project } from '@/app/lib/supabase';
import { parseTechnologies } from '@/app/lib/utils';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  isLoading?: boolean;
}

export default function ProjectForm({ 
  project, 
  onSubmit, 
  isLoading = false 
}: ProjectFormProps) {
  const [technologiesInput, setTechnologiesInput] = useState(
    project?.technologies ? project.technologies.join(', ') : ''
  );
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setValue
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: project ? {
      title: project.title,
      description: project.description || '',
      image_url: project.image_url || '',
      project_url: project.project_url || '',
      github_url: project.github_url || '',
      technologies: project.technologies,
      featured: project.featured,
      order: project.order || 0,
      category: project.category || '',
    } : {
      title: '',
      description: '',
      image_url: '',
      project_url: '',
      github_url: '',
      technologies: [],
      featured: false,
      order: 0,
      category: '',
    }
  });
  
  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTechnologiesInput(value);
    setValue('technologies', parseTechnologies(value));
  };
  
  const handleFormSubmit = (data: ProjectFormValues) => {
    // Ensure technologies are parsed from the input
    const formData = {
      ...data,
      technologies: parseTechnologies(technologiesInput)
    };
    
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <input
            id="category"
            type="text"
            {...register('category')}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="image_url" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            id="image_url"
            type="text"
            {...register('image_url')}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          {errors.image_url && (
            <p className="text-sm text-red-500">{errors.image_url.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="project_url" className="block text-sm font-medium">
            Project URL
          </label>
          <input
            id="project_url"
            type="text"
            {...register('project_url')}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          {errors.project_url && (
            <p className="text-sm text-red-500">{errors.project_url.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="github_url" className="block text-sm font-medium">
            GitHub URL
          </label>
          <input
            id="github_url"
            type="text"
            {...register('github_url')}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          {errors.github_url && (
            <p className="text-sm text-red-500">{errors.github_url.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="technologies" className="block text-sm font-medium">
            Technologies *
          </label>
          <input
            id="technologies"
            type="text"
            value={technologiesInput}
            onChange={handleTechnologiesChange}
            placeholder="React, Next.js, Tailwind CSS"
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated list of technologies used in the project
          </p>
          {errors.technologies && (
            <p className="text-sm text-red-500">{errors.technologies.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="order" className="block text-sm font-medium">
            Display Order
          </label>
          <input
            id="order"
            type="number"
            {...register('order', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={5}
          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          disabled={isLoading}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          id="featured"
          type="checkbox"
          {...register('featured')}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
          disabled={isLoading}
        />
        <label htmlFor="featured" className="text-sm font-medium">
          Featured Project
        </label>
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
} 