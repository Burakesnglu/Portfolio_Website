'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Code2, Cpu, Globe2, Lightbulb, Briefcase, Award, GraduationCap, Users } from 'lucide-react';

const skills = [
  {
    name: 'Frontend Development',
    description: 'Modern web teknolojileri ile kullanıcı dostu arayüzler',
    icon: Code2,
    delay: 0.2,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    name: 'Responsive Design',
    description: 'Tüm cihazlarda mükemmel görünen tasarımlar',
    icon: Globe2,
    delay: 0.3,
    color: 'bg-cyan-500/10 text-cyan-500',
  },
  {
    name: 'Performance Optimization',
    description: 'Hızlı ve optimize edilmiş web uygulamaları',
    icon: Cpu,
    delay: 0.4,
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    name: 'Problem Solving',
    description: 'Karmaşık problemlere yaratıcı çözümler',
    icon: Lightbulb,
    delay: 0.5,
    color: 'bg-amber-500/10 text-amber-500',
  },
];

const experience = [
  {
    title: 'Frontend Developer',
    company: 'Logitrans Logistic',
    period: '2021 - 2024',
    icon: Briefcase,
    color: 'bg-primary/10 text-primary',
  }, 
  {
    title: 'Computer Programming',
    company: 'Sakarya Üniversitesi',
    period: '2019 - 2021',
    icon: GraduationCap,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'JavaScript Certificate',
    company: 'Sololearn',
    period: '2022',
    icon: Award,
    color: 'bg-amber-500/10 text-amber-500',
  }
];

const technologies = [
  { name: 'React', type: 'frontend' },
  { name: 'Next.js', type: 'frontend' },
  { name: 'TypeScript', type: 'language' },
  { name: 'Tailwind CSS', type: 'styling' },
  { name: 'Node.js', type: 'backend' },
  { name: 'GraphQL', type: 'api' },
  { name: 'PostgreSQL', type: 'database' },
  { name: 'Git', type: 'tools' },
  { name: 'Docker', type: 'devops' },
  { name: 'AWS', type: 'cloud' },
  { name: 'Supabase', type: 'backend' },
  { name: 'Framer Motion', type: 'animation' },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-background overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:60px_60px]" />
        <motion.div
          className="absolute -right-[15%] top-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]"
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
          className="absolute -left-[15%] bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/5 via-background/10 to-background/80" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-2 text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Hakkımda
          </h2>
          <p className="text-muted-foreground text-lg">
            Frontend geliştirici olarak modern web teknolojileri ile kullanıcı odaklı dijital çözümler sunuyorum.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Profile & Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-xl bg-card/30 backdrop-blur-sm border border-border/40 shadow-sm"
            >
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                {/*<div className="relative w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded-lg shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"
                    alt="Burak Esenoglu"
                    fill
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div> */}
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-2xl font-semibold">Burak Esenoglu</h3>
                  <p className="text-primary font-medium">Senior Frontend Developer</p>
                  <p className="mt-3 text-muted-foreground">
                    5 yıllık deneyime sahip, kullanıcı odaklı web çözümleri geliştiren, teknoloji tutkunu bir yazılım geliştiricisiyim.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Experience Timeline */}
            <div className="space-y-4"> 
              <div className="space-y-4">
                {experience.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-card/20 hover:bg-card/30 transition-colors border border-border/20"
                    >
                      <div className={`mt-1 flex-shrink-0 rounded-md p-2 ${item.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.company} • {item.period}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          > 
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.4, delay: skill.delay }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="group relative overflow-hidden rounded-lg bg-card/30 backdrop-blur-sm p-6 border border-border/40 shadow-sm hover:border-border/60 transition-colors"
                  >
                    <div className="relative">
                      <div className={`mb-4 inline-block rounded-md p-3 ${skill.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-medium">{skill.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Technologies */}
            <div className="space-y-4"> 
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      y: -3,
                      backgroundColor: "rgba(217, 217, 227, 0.12)" 
                    }}
                    transition={{
                      duration: 0.3,
                      delay: 0.3 + index * 0.05,
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm bg-muted/50 text-muted-foreground hover:text-foreground transition-colors`}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 