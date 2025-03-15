'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Button, Input, Label, Textarea, Switch } from '../ui';
import { projectSchema, type ProjectFormData } from '../../lib/validators';
import type { Project } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';
import type { Database } from '../../lib/database.types';

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(project?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (files: FileList) => {
    setIsUploading(true);
    const supabase = createClientComponentClient<Database>();
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `project-images/${fileName}`;

        console.log('Uploading file:', {
          name: file.name,
          path: filePath
        });

        const { error: uploadError, data } = await supabase.storage
          .from('projects')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);

        console.log('Generated public URL:', publicUrl);
        
        if (publicUrl) {
          uploadedUrls.push(publicUrl);
        }
      }

      console.log('All uploaded URLs:', uploadedUrls);
      setUploadedImages(prev => [...prev, ...uploadedUrls]);
      toast.success('Görseller başarıyla yüklendi');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Görsel yükleme sırasında bir hata oluştu');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async (imageUrl: string) => {
    const supabase = createClientComponentClient<Database>();
    const imagePath = imageUrl.split('/').pop();

    try {
      if (imagePath) {
        const { error } = await supabase.storage
          .from('projects')
          .remove([`project-images/${imagePath}`]);
          
        if (error) {
          console.error('Remove error:', error);
          throw error;
        }
      }

      setUploadedImages(prev => prev.filter(url => url !== imageUrl));
      toast.success('Görsel başarıyla kaldırıldı');
    } catch (error) {
      console.error('Image remove error:', error);
      toast.error('Görsel kaldırılırken bir hata oluştu');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string || null,
        images: uploadedImages,
        project_url: formData.get('project_url') as string || null,
        github_url: formData.get('github_url') as string || null,
        technologies: (formData.get('technologies') as string)?.split(',').map(t => t.trim()) || [],
        featured: formData.get('featured') === 'on',
        category: formData.get('category') as string || null,
        order: parseInt(formData.get('order') as string) || null,
      };

      const result = projectSchema.safeParse(data);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        Object.entries(errors).forEach(([field, messages]) => {
          if (messages) toast.error(messages[0]);
        });
        return;
      }

      const supabase = createClientComponentClient<Database>();

      if (project) {
        const { error } = await supabase
          .from('projects')
          .update(data)
          .eq('id', project.id);

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        toast.success('Proje başarıyla güncellendi');
      } else {
        const { error } = await supabase
          .from('projects')
          .insert(data);

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        toast.success('Proje başarıyla oluşturuldu');
      }

      router.refresh();
      router.push('/admin/projects');
    } catch (error) {
      console.error('Form submit error:', error);
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Proje Başlığı</Label>
          <Input
            id="title"
            name="title"
            defaultValue={project?.title}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label>Proje Görselleri</Label>
          <div className="grid gap-4">
            <div className="flex flex-wrap gap-4">
              {uploadedImages.map((url, index) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt={`Project image ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                disabled={isUploading}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Yükleniyor...
                  </>
                ) : (
                  'Görsel Yükle'
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Açıklama</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={project?.description || ''}
            disabled={isLoading}
            rows={5}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project_url">Proje URL</Label>
          <Input
            id="project_url"
            name="project_url"
            type="url"
            defaultValue={project?.project_url || ''}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            name="github_url"
            type="url"
            defaultValue={project?.github_url || ''}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="technologies">Teknolojiler (virgülle ayırın)</Label>
          <Input
            id="technologies"
            name="technologies"
            defaultValue={project?.technologies?.join(', ') || ''}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Input
            id="category"
            name="category"
            defaultValue={project?.category || ''}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">Sıralama</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={project?.order || ''}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            name="featured"
            defaultChecked={project?.featured}
            disabled={isLoading}
          />
          <Label htmlFor="featured">Öne Çıkan Proje</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? project
              ? 'Güncelleniyor...'
              : 'Oluşturuluyor...'
            : project
            ? 'Güncelle'
            : 'Oluştur'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/projects')}
          disabled={isLoading}
        >
          İptal
        </Button>
      </div>
    </form>
  );
} 