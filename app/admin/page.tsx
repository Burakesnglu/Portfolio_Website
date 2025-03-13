import Link from 'next/link';
import { Plus, FileText, Settings, Users } from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

async function getStats() {
  // Get total projects count
  const { count: totalProjects, error: totalError } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });
  
  // Get featured projects count
  const { count: featuredProjects, error: featuredError } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('featured', true);
  
  if (totalError || featuredError) {
    console.error('Error fetching stats:', totalError || featuredError);
    return {
      totalProjects: 0,
      featuredProjects: 0
    };
  }
  
  return {
    totalProjects: totalProjects || 0,
    featuredProjects: featuredProjects || 0
  };
}

export const metadata = {
  title: 'Admin Dashboard | Portfolio',
  description: 'Manage your portfolio content',
};

export default async function AdminDashboardPage() {
  const stats = await getStats();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-lg border border-border/40">
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-md mr-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
              <h3 className="text-2xl font-bold">{stats.totalProjects}</h3>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-card rounded-lg border border-border/40">
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-md mr-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Featured Projects</p>
              <h3 className="text-2xl font-bold">{stats.featuredProjects}</h3>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-card rounded-lg border border-border/40">
          <div className="flex items-center">
            <div className="p-3 bg-primary/10 rounded-md mr-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Admin Users</p>
              <h3 className="text-2xl font-bold">1</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-card rounded-lg border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/admin/projects"
            className="p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors flex items-center"
          >
            <FileText className="mr-2 h-5 w-5 text-primary" />
            Manage Projects
          </Link>
          
          <Link
            href="/admin/projects/new"
            className="p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors flex items-center"
          >
            <Plus className="mr-2 h-5 w-5 text-primary" />
            Add New Project
          </Link>
          
          <Link
            href="/admin/settings"
            className="p-4 bg-muted rounded-md hover:bg-muted/80 transition-colors flex items-center"
          >
            <Settings className="mr-2 h-5 w-5 text-primary" />
            Settings
          </Link>
        </div>
      </div>
      
      <div className="p-6 bg-card rounded-lg border border-border/40">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">No recent activity to display.</p>
      </div>
    </div>
  );
} 