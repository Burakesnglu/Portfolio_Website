'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Globe, ArrowUpRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/app/components/ui/skeleton';
import type { Project } from '@/app/lib/supabase';

async function getProjects() {
  const supabase = createClientComponentClient();
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true });
  return data as Project[];
}

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  return (
    <section id="projects" className="relative py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            <span className="text-gradient">Projeler</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Modern teknolojiler kullanarak geliştirdiğim bazı projeler
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-card"
              >
                <Skeleton className="aspect-video w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="mt-2 h-20 w-full" />
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16 rounded-full" />
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            projects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                </div>

                {/* Project Content */}
                <div className="relative p-6">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex items-center gap-4">
                    <Button
                      asChild
                      variant="default"
                      size="sm"
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Link 
                        href={project.project_url} 
                        target="_blank"
                        className="flex items-center justify-center gap-2"
                      >
                        <Globe className="h-4 w-4" />
                        <span>Demo</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                    {project.github_url && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-primary/20 hover:bg-primary/10"
                      >
                        <Link 
                          href={project.github_url} 
                          target="_blank"
                          className="flex items-center justify-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          <span>Kaynak Kod</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
} 