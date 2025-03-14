'use client';

import Link from 'next/link';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Project } from '@/app/lib/supabase';

export function ProjectList({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Proje başarıyla silindi');
      router.refresh();
    } catch (error) {
      toast.error('Proje silinirken bir hata oluştu');
    }
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 text-left text-sm font-medium text-muted-foreground">
                Başlık
              </th>
              <th className="p-3 text-left text-sm font-medium text-muted-foreground">
                Kategori
              </th>
              <th className="p-3 text-left text-sm font-medium text-muted-foreground">
                Durum
              </th>
              <th className="p-3 text-left text-sm font-medium text-muted-foreground">
                Tarih
              </th>
              <th className="p-3 text-right text-sm font-medium text-muted-foreground">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="p-3 text-sm">{project.title}</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {project.category || '-'}
                  </td>
                  <td className="p-3 text-sm">
                    {project.featured ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        Öne Çıkan
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        Normal
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    {new Date(project.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/projects/${project.id}`}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Görüntüle"
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Görüntüle</span>
                      </Link>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Düzenle</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Sil</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center text-muted-foreground">
                  Henüz proje eklenmemiş.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 