'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '../ui';
import { ChevronDown, Github, Linkedin, Mail, Code2, Sparkles, ArrowRight, Brain, Server, Database, Layers, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: Linkedin,
  },
  {
    name: 'Mail',
    href: 'mailto:your@email.com',
    icon: Mail,
  },
];

const technologies = [
  { name: 'React', icon: Code2, delay: 0, color: 'from-blue-400/70 to-blue-600/70' },
  { name: 'Next.js', icon: Server, delay: 0.1, color: 'from-slate-400/70 to-slate-600/70' },
  { name: 'TypeScript', icon: Code2, delay: 0.2, color: 'from-blue-500/70 to-blue-700/70' },
  { name: 'Tailwind', icon: Layers, delay: 0.3, color: 'from-cyan-400/70 to-cyan-600/70' },
  { name: 'Supabase', icon: Database, delay: 0.4, color: 'from-emerald-400/70 to-emerald-600/70' },
  { name: 'AI', icon: Brain, delay: 0.5, color: 'from-purple-400/70 to-purple-600/70' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  
  const rotateX = useSpring(useTransform(mouseY, [0, windowSize.height || 1], [5, -5]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, windowSize.width || 1], [-5, 5]), {
    stiffness: 100,
    damping: 30,
  });

  // Auto-rotate through technologies
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % technologies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-20 bg-background"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px] perspective-[1000px]">
          <motion.div 
            className="absolute inset-0" 
            style={{ 
              rotateX: useTransform(mouseY, [0, windowSize.height || 1], [2, -2]),
              rotateY: useTransform(mouseX, [0, windowSize.width || 1], [-2, 2]),
            }}
          />
        </div>
        
        {/* Subtle glowing orbs with reduced opacity */}
        <motion.div
          className="absolute -left-[15%] top-[25%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -right-[15%] top-[35%] h-[600px] w-[600px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[15%] left-[25%] h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Subtle overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/20 to-background/60" />
      </div>

      {/* Refined particles - fewer and more subtle */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => {
            const colorClass = i % 4 === 0 
              ? 'bg-purple-500/30' 
              : i % 4 === 1 
                ? 'bg-blue-500/30' 
                : i % 4 === 2
                  ? 'bg-cyan-500/30'
                  : 'bg-slate-500/30';
            const sizeClass = i % 6 === 0 ? 'h-1.5 w-1.5' : 'h-1 w-1';
            
            return (
              <motion.div
                key={i}
                className={`absolute rounded-full ${colorClass} ${sizeClass}`}
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                animate={{
                  x: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                  ],
                  y: [
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 100}%`,
                  ],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: Math.random() * 20 + 30,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Content with refined spacing */}
      <motion.div
        className="container relative z-10 mx-auto px-4 md:px-6"
        style={{ scale, opacity, y }}
      >
        <div className="flex flex-col items-center lg:items-start">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left Content - Takes 3 columns on large screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3 space-y-8"
            >
              {/* Name with refined gradient */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  perspective: 1000,
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="text-left"
              >
                <motion.h1
                  className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-foreground mb-2"
                  style={{
                    rotateX: isHovering ? rotateX : 0,
                    rotateY: isHovering ? rotateY : 0,
                    transition: "all 0.3s ease-out",
                  }}
                >
                  Burak <span className="text-primary">Esenoglu</span>
                </motion.h1>
                {/* Refined professional subtitle */}
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-lg sm:text-xl">
                  <div className="px-3 py-1 rounded-md bg-primary/10 text-primary font-medium inline-flex items-center">
                    <Code2 className="w-4 h-4 mr-2" />
                    Frontend Developer
                  </div>
                  <div className="px-3 py-1 rounded-md bg-secondary/10 text-secondary font-medium inline-flex items-center">
                    <Database className="w-4 h-4 mr-2" />
                    Supabase Uzmanı
                  </div>
                </div>
              </motion.div>

              {/* Professional description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground text-lg max-w-xl leading-relaxed"
              >
                Kullanıcı odaklı dijital deneyimler oluşturmak için modern teknolojileri kullanıyorum. 
                Kurumsal seviyede ölçeklenebilir ve yüksek performanslı web uygulamaları geliştiriyorum.
              </motion.p>

              {/* Technology Pills with subtle animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                <span className="text-sm font-medium text-muted-foreground mr-2 pt-1">Teknolojiler:</span>
                {technologies.map((tech, index) => (
                  <motion.div 
                    key={tech.name}
                    className={`px-3 py-1 rounded-md text-sm 
                      ${activeIndex === index 
                        ? 'bg-gradient-to-r ' + tech.color + ' text-white font-medium shadow-sm' 
                        : 'bg-muted text-muted-foreground'}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: activeIndex === index ? 1.05 : 1,
                      y: activeIndex === index ? -2 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="flex items-center">
                      <tech.icon className="w-3.5 h-3.5 mr-1.5" />
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons with refined design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white rounded-md font-medium shadow-sm"
                >
                  <Link href="#projects" className="flex items-center gap-2">
                    <span>Projelerimi Gör</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-muted-foreground/20 hover:bg-muted/50 rounded-md font-medium"
                >
                  <Link href="#contact" className="flex items-center gap-2">
                    <span>İletişime Geç</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              {/* Social Links with refined design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-4 pt-2"
              >
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-10 w-10 items-center justify-center rounded-md bg-muted/50 hover:bg-muted transition-colors duration-200"
                        aria-label={link.name}
                      >
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right Side - Tech visualization with a modern corporate touch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="hidden lg:block lg:col-span-2"
            >
              <div className="relative h-full min-h-[300px] flex items-center justify-center">
                {/* Subtle decorative element */}
                <motion.div
                  className="absolute w-64 h-64 border border-primary/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-80 h-80 border border-primary/5 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Tech stack visualization */}
                <div className="relative grid grid-cols-2 gap-5">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: activeIndex === index ? 1.05 : 0.95,
                        zIndex: activeIndex === index ? 10 : 1
                      }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + index * 0.1,
                      }}
                      className={`group flex flex-col items-center justify-center p-4 rounded-lg
                        ${activeIndex === index 
                          ? 'bg-white/5 backdrop-blur-sm shadow-sm border border-primary/10' 
                          : 'bg-white/0'} 
                        transition-all duration-300`}
                    >
                      <motion.div
                        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg 
                          ${activeIndex === index 
                            ? 'bg-gradient-to-br ' + tech.color + ' text-white shadow-sm' 
                            : 'bg-muted/30 text-muted-foreground'} 
                          transition-all duration-300`}
                      >
                        <tech.icon className="h-6 w-6" />
                      </motion.div>
                      <span className={`text-sm font-medium ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Refined scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="mb-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">Keşfet</span>
          <div className="p-1 border border-muted-foreground/20 rounded-full">
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 