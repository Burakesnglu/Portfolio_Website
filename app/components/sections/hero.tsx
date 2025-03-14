'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/app/components/ui/button';
import { ChevronDown, Github, Linkedin, Mail, Code2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

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
  { name: 'React', icon: Code2, delay: 0 },
  { name: 'Next.js', icon: Sparkles, delay: 0.1 },
  { name: 'TypeScript', icon: Code2, delay: 0.2 },
  { name: 'Tailwind', icon: Sparkles, delay: 0.3 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const rotateX = useSpring(useTransform(mouseY, [0, window?.innerHeight], [15, -15]), {
    stiffness: 100,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, window?.innerWidth], [-15, 15]), {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-20"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div
          className="absolute -left-[10%] top-[20%] h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/20 blur-[128px]"
          style={{ transform: 'rotate(-45deg)' }}
        />
        <div
          className="absolute -right-[10%] top-[30%] h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500/20 blur-[128px]"
          style={{ transform: 'rotate(45deg)' }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-background/80 via-background to-background"
          style={{ opacity }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/20"
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
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-4"
        style={{ scale, opacity }}
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              perspective: 1000,
            }}
          >
            <motion.div
              className="relative inline-block"
              style={{
                rotateX,
                rotateY,
              }}
            >
              <h1 className="bg-gradient-to-r from-foreground via-foreground/80 to-foreground/40 min-h-20 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
                Burak Esenoglu
              </h1>
              <div className="absolute -inset-x-6 -inset-y-4 z-[-1] rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mx-auto mt-6 max-w-3xl text-xl text-muted-foreground">
              Frontend Developer
            </p>
          </motion.div>

          {/* Technologies */}
          <motion.div className="mt-8 flex items-center justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group flex flex-col items-center"
              >
                <div className="relative">
                  <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
                  <tech.icon className="relative h-8 w-8 text-muted-foreground transition-colors duration-200 group-hover:text-primary" />
                </div>
                <span className="mt-2 text-sm text-muted-foreground">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 hover:from-purple-600 hover:to-blue-600"
            >
              <Link href="#projects" className="relative z-10">
                <span className="relative z-10">Projelerimi Gör</span>
                <motion.div
                  className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="group relative border-purple-500/20 bg-background/50 backdrop-blur transition-all duration-300 hover:bg-background/80"
            >
              <Link href="#contact">
                <span className="relative z-10">İletişime Geç</span>
                <motion.div
                  className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-center justify-center gap-6"
          >
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <span className="absolute -inset-4 -z-10 scale-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-lg transition-all duration-300 group-hover:scale-100" />
                  <span className="absolute -inset-2 -z-10 scale-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 transition-all duration-300 group-hover:scale-100" />
                  <Icon className="h-6 w-6 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                </Link>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <Link
            href="#about"
            className="group flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 