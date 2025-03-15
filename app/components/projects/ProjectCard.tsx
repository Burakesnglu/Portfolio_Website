'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Calendar, Layers } from 'lucide-react';
import { Button, Badge } from '../ui';
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '../../lib/supabase';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Ensure images is always an array
  const images = Array.isArray(project.images) 
    ? project.images 
    : [];
  
  // Add image_url to images array if it exists and not already included
  const allImages = project.image_url && !images.includes(project.image_url)
    ? [project.image_url, ...images].filter(Boolean)
    : images.filter(Boolean);

  const nextImage = useCallback(() => {
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Format date if available
  const formattedDate = project.created_at 
    ? new Date(project.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative overflow-hidden rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm shadow-sm hover:border-border/60 hover:shadow-md transition-all duration-300"
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        {allImages && allImages.length > 0 ? (
          <>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentImageIndex}
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={allImages[currentImageIndex]}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized // If using external URLs
                />
              </motion.div>
            </AnimatePresence>
            
            {allImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevImage();
                  }}
                  className="p-2 rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm z-10 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextImage();
                  }}
                  className="p-2 rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm z-10 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {allImages.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? 'bg-white w-3'
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">Resim yok</span>
          </div>
        )}
        
        {/* Badge and date overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
          {project.category && (
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {project.category}
            </Badge>
          )}
          {formattedDate && (
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </Badge>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      {/* Project Content */}
      <div className="relative p-6">
        <h3 className="text-lg font-medium">{project.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies && project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-muted/50 text-muted-foreground hover:bg-muted"
            >
              <Layers className="mr-1 h-3 w-3" />
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link 
              href={project.project_url || '#'} 
              target="_blank"
              className="flex items-center justify-center gap-1.5"
            >
              <span>Demo</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
          {project.github_url && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-border/50 hover:bg-muted/50"
            >
              <Link 
                href={project.github_url} 
                target="_blank"
                className="flex items-center justify-center gap-1.5"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Kaynak</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 