import { getUser } from '@/app/lib/auth';
import { createServerSupabaseClient } from '@/app/lib/auth';
import Link from 'next/link';
import { Plus, FileText, Settings, Users } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard',
};

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient();
  const user = await getUser();

  // Proje istatistiklerini al
  const { data: stats } = await supabase
    .from('projects')
    .select('*', { count: 'exact' });

  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .limit(5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Hoş geldiniz, {user?.email}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Toplam Proje</h3>
          </div>
          <div className="text-2xl font-bold">{stats?.length || 0}</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Öne Çıkan Projeler</h3>
          </div>
          <div className="text-2xl font-bold">{featuredProjects?.length || 0}</div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Son Eklenen Projeler</h2>
        {stats && stats.length > 0 ? (
          <div className="rounded-md border">
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-muted-foreground">
                    <th className="p-2">Başlık</th>
                    <th className="p-2">Kategori</th>
                    <th className="p-2">Durum</th>
                    <th className="p-2">Tarih</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.slice(0, 5).map((project) => (
                    <tr key={project.id} className="border-t">
                      <td className="p-2">{project.title}</td>
                      <td className="p-2">{project.category || '-'}</td>
                      <td className="p-2">
                        {project.featured ? 'Öne Çıkan' : 'Normal'}
                      </td>
                      <td className="p-2">
                        {new Date(project.created_at).toLocaleDateString('tr-TR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Henüz proje eklenmemiş.</p>
        )}
      </div>
    </div>
  );
} 