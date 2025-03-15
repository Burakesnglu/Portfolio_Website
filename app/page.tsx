'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Providers } from './providers';
import { Header } from './components/layout';  
import { Hero, About, Projects, Contact } from './components/sections';

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Providers>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 transform origin-left z-50"
          style={{ scaleX }}
        />

        {/* Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Main Background */}
          <div className="absolute inset-0 bg-background" />
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Animated Gradient Orbs */}
          <div className="absolute -left-[10%] top-[20%] h-[600px] w-[600px] animate-pulse rounded-full bg-purple-500/20 blur-[120px]" />
          <div className="absolute -right-[10%] top-[30%] h-[600px] w-[600px] animate-pulse rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute left-[20%] bottom-[10%] h-[600px] w-[600px] animate-pulse rounded-full bg-cyan-500/20 blur-[120px]" />
        </div>

        {/* Main Content */}
        <div className="relative min-h-screen">
          <Header />
          <main className="flex flex-col items-center">
            <Hero />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <About />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Projects />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <Contact />
            </motion.div>
          </main>
        </div>
      </ThemeProvider>
    </Providers>
  );
} 