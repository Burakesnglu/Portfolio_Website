'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/app/lib/supabase';
import { truncateText } from '@/app/lib/utils';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const images = project.images || [];

  useEffect(() => {
    // Log the image URLs for debugging
    console.log(`Project "${project.title}" Images:`, images);
  }, [images, project.title]);

  // Otomatik slayt geçişi
  useEffect(() => {
    if (images.length <= 1 || isHovering) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Her 5 saniyede bir geçiş

    return () => clearInterval(interval);
  }, [images.length, isHovering]);

  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    console.log(`Moving to next image: ${currentImageIndex + 1} of ${images.length}`);
  }, [images.length, currentImageIndex]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    console.log(`Moving to previous image: ${currentImageIndex - 1 < 0 ? images.length - 1 : currentImageIndex - 1} of ${images.length}`);
  }, [images.length, currentImageIndex]);

  const handleImageError = () => {
    console.error('Image load error:', {
      projectTitle: project.title,
      imageIndex: currentImageIndex,
      imageUrl: images[currentImageIndex]
    });
    setImageError(true);
  };

  // URL'yi düzeltmek için yardımcı fonksiyon
  const getImageUrl = (url: string | undefined): string => {
    if (!url) return '';
    return url;
  };

  const currentImage = images[currentImageIndex];
  const imageUrl = getImageUrl(currentImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg border border-border/40 bg-card text-card-foreground shadow-sm hover:shadow-md transition-all"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            <div className="relative h-full w-full">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={imageUrl}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={handleImageError}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    prevImage();
                  }}
                  className="p-1.5 rounded-full bg-white/80 text-black shadow-md hover:bg-white z-10 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    nextImage();
                  }}
                  className="p-1.5 rounded-full bg-white/80 text-black shadow-md hover:bg-white z-10 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, idx) => (
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
            {images.length === 1 && (
              <div className="absolute bottom-2 right-2 z-10 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                1/1
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        {project.featured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full z-10 shadow-sm">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <div className="flex space-x-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            )}
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Live Demo</span>
              </a>
            )}
          </div>
        </div>
        
        {project.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {truncateText(project.description, 100)}
          </p>
        )}
        
        {project.technologies && project.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-full border border-border/40 px-2 py-0.5 text-xs font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-border/40">
          <Link
            href={`/projects/${project.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 