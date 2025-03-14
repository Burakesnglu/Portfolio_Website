import { createServerSupabaseClient } from '@/app/lib/auth';
import { ProjectForm } from '@/app/components/forms/ProjectForm';
import { notFound } from 'next/navigation';

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EditProjectPageProps) {
  const supabase = createServerSupabaseClient();
  const { data: project } = await supabase
    .from('projects')
    .select()
    .eq('id', params.id)
    .single();

  return {
    title: project ? `${project.title} Düzenle` : 'Proje Düzenle',
  };
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const supabase = createServerSupabaseClient();
  const { data: project } = await supabase
    .from('projects')
    .select()
    .eq('id', params.id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Proje Düzenle</h1>
        <p className="text-muted-foreground">
          {project.title} projesini düzenleyin
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <ProjectForm project={project} />
      </div>
    </div>
  );
} 