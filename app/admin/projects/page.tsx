import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/lib/auth';
import { ProjectList } from '@/app/components/projects/project-list';
import { Button } from '@/app/components/ui/button';
import { Plus } from 'lucide-react';

export const metadata = {
  title: 'Projeler',
};

export default async function ProjectsPage() {
  const supabase = createServerSupabaseClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projeler</h1>
          <p className="text-muted-foreground">
            Portfolyonuzdaki projeleri yönetin
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Proje
          </Button>
        </Link>
      </div>

      <ProjectList projects={projects || []} />
    </div>
  );
} 