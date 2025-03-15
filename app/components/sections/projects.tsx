'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import type { Project } from '../../lib/supabase';
import ProjectCard from '../projects/ProjectCard';

const categories = [
  { name: 'Tümü', value: 'all' },
  { name: 'Web Uygulama', value: 'web' },
  { name: 'Mobil', value: 'mobile' },
  { name: 'UI/UX', value: 'design' },
];

async function getProjects() {
  try {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Supabase error:', error);
      return [];
    }
    
    // Veriye image_url ekle
    const projectsWithImageUrl = data?.map(project => ({
      ...project,
      image_url: project.images && project.images.length > 0 ? project.images[0] : null
    }));
    
    return projectsWithImageUrl as Project[];
  } catch (error) {
    console.error('Projects fetch error:', error);
    return [];
  }
}

export default function Projects() {
  const [category, setCategory] = useState('all');
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const filteredProjects = category === 'all' 
    ? projects 
    : projects?.filter(project => project.category === category);

  return (
    <section id="projects" className="relative py-20 bg-background overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]" />
        <motion.div
          className="absolute -left-[15%] top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-[15%] bottom-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Subtle overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/10 to-background/80" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-2 text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Projeler
          </h2>
          <p className="text-muted-foreground text-lg">
            Modern teknolojiler kullanarak geliştirdiğim ve farklı sektörlerdeki ihtiyaçlara yönelik çözümler
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center mb-12 overflow-x-auto pb-2"
        >
          <div className="inline-flex rounded-md shadow-sm border border-border/40 p-1 bg-card/30 backdrop-blur-sm">
            {categories.map((cat, index) => (
              <motion.button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 text-sm rounded-md font-medium transition-all
                  ${category === cat.value 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'}`}
                whileHover={{ scale: category !== cat.value ? 1.05 : 1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Loading skeletons with refined design
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm shadow-sm"
              >
                <Skeleton className="aspect-video w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-md" />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-1/2 rounded-md" />
                    <Skeleton className="h-9 w-1/2 rounded-md" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="col-span-3 py-20 text-center">
              <p className="text-muted-foreground">Henüz proje bulunmuyor.</p>
            </div>
          )}
        </div>

        {/* View all projects button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 text-center"
        >
          <Button 
            asChild
            variant="outline" 
            className="border-border/40 bg-card/20 backdrop-blur-sm hover:bg-card/40"
          >
            <Link href="/projects" className="flex items-center gap-2">
              <span>Tüm Projeleri Görüntüle</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 