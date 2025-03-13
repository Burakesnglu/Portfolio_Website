import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { formatDate } from '@/app/lib/utils';

async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data || [];
}

export const metadata = {
  title: 'Manage Projects | Admin',
  description: 'Manage your portfolio projects',
};

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Link>
      </div>
      
      <div className="bg-card rounded-lg border border-border/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Featured</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/30">
                    <td className="px-4 py-4 text-sm font-medium">{project.title}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{project.category || '-'}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">{formatDate(project.created_at)}</td>
                    <td className="px-4 py-4 text-sm text-muted-foreground">
                      {project.featured ? (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/projects/${project.id}`}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                        <button
                          className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No projects found. Create your first project.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 