'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Code2, Cpu, Globe2, Lightbulb } from 'lucide-react';

const skills = [
  {
    name: 'Frontend Development',
    description: 'Modern web teknolojileri ile kullanıcı dostu arayüzler',
    icon: Code2,
    delay: 0.2,
  },
  {
    name: 'Responsive Design',
    description: 'Tüm cihazlarda mükemmel görünen tasarımlar',
    icon: Globe2,
    delay: 0.3,
  },
  {
    name: 'Performance Optimization',
    description: 'Hızlı ve optimize edilmiş web uygulamaları',
    icon: Cpu,
    delay: 0.4,
  },
  {
    name: 'Problem Solving',
    description: 'Karmaşık problemlere yaratıcı çözümler',
    icon: Lightbulb,
    delay: 0.5,
  },
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'GraphQL', 'PostgreSQL', 'Git', 'Docker', 'AWS',
];

export default function About() {
  return (
    <section id="about" className="relative py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute left-0 bottom-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
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
            <span className="text-gradient">Hakkımda</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Frontend geliştirici olarak modern web teknolojilerini kullanarak
            etkileyici kullanıcı deneyimleri oluşturuyorum.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm"
          >
            <div className="p-8">
              <div className="aspect-square w-48 mx-auto overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"
                  alt="Profile"
                  width={400}
                  height={400}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-semibold">Burak</h3>
                <p className="mt-2 text-muted-foreground">
                  5 yıllık deneyimle frontend geliştirme alanında uzmanlaşmış,
                  kullanıcı deneyimini ön planda tutan bir geliştiriciyim.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: skill.delay }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl bg-card/50 backdrop-blur-sm p-6 hover:bg-card/70 transition-colors"
                >
                  <div className="relative">
                    <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-center text-2xl font-semibold mb-8">
            Teknolojiler
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.7 + index * 0.1,
                  type: 'spring',
                }}
                viewport={{ once: true }}
                className="inline-block rounded-full px-4 py-2 text-sm bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 