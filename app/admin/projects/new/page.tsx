import { ProjectForm } from '@/app/components/forms/ProjectForm';

export const metadata = {
  title: 'Yeni Proje',
};

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Yeni Proje</h1>
        <p className="text-muted-foreground">
          Portfolyonuza yeni bir proje ekleyin
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <ProjectForm />
      </div>
    </div>
  );
} 