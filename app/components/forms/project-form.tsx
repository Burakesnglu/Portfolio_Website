'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { projectSchema, type ProjectFormData } from '@/app/lib/validators';
import type { Project } from '@/app/lib/supabase';

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        image_url: formData.get('image_url') as string,
        project_url: formData.get('project_url') as string,
        github_url: formData.get('github_url') as string,
        technologies: (formData.get('technologies') as string).split(',').map(t => t.trim()),
        featured: formData.get('featured') === 'on',
        category: formData.get('category') as string,
        order: parseInt(formData.get('order') as string) || null,
      };

      // Form validasyonu
      const result = projectSchema.safeParse(data);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        Object.entries(errors).forEach(([field, messages]) => {
          if (messages) toast.error(messages[0]);
        });
        return;
      }

      const supabase = createClientComponentClient();

      if (project) {
        // Güncelleme işlemi
        const { error } = await supabase
          .from('projects')
          .update(data)
          .eq('id', project.id);

        if (error) throw error;
        toast.success('Proje başarıyla güncellendi');
      } else {
        // Yeni proje oluşturma
        const { error } = await supabase
          .from('projects')
          .insert(data);

        if (error) throw error;
        toast.success('Proje başarıyla oluşturuldu');
      }

      router.refresh();
      router.push('/admin/projects');
    } catch (error) {
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
          <Label htmlFor="image_url">Görsel URL</Label>
          <Input
            id="image_url"
            name="image_url"
            type="url"
            defaultValue={project?.image_url || ''}
            disabled={isLoading}
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