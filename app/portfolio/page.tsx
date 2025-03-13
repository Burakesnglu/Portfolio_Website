import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import ProjectList from '../components/projects/ProjectList';
import { supabase } from '@/app/lib/supabase';

async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('order', { ascending: true })
    .limit(3);
  
  if (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
  
  return data || [];
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Creative Developer & Designer
              </h1>
              <p className="text-xl text-muted-foreground">
                I build modern, responsive websites and applications with cutting-edge technologies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/projects" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
                >
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-muted z-10 mix-blend-overlay" />
              <Image
                src="/placeholder-hero.jpg"
                alt="Hero Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl">
                A selection of my recent work. These projects showcase my skills and experience in web development.
              </p>
            </div>
            <Link 
              href="/projects" 
              className="inline-flex items-center text-primary hover:underline mt-4 md:mt-0"
            >
              View All Projects
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <ProjectList projects={featuredProjects} />
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Skills & Technologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'PostgreSQL', 'UI/UX Design', 'Responsive Design', 'RESTful APIs', 'Git'].map((skill) => (
              <div 
                key={skill}
                className="flex flex-col items-center justify-center p-6 bg-card rounded-lg border border-border/40 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <span className="text-center font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 