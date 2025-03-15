'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '../../components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

const contactMethods = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: Github,
    description: 'Projelerimi ve kaynak kodlarımı inceleyin',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: Linkedin,
    description: 'Profesyonel profilimi ziyaret edin',
  },
  {
    name: 'Email',
    href: 'mailto:your@email.com',
    icon: Mail,
    description: 'İş birlikleri ve projeler için iletişime geçin',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute right-1/3 top-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
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
            <span className="text-gradient">İletişime Geçin</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Projeleriniz için iş birliği yapmak veya sorularınız için benimle
            iletişime geçebilirsiniz.
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-card p-8 transition-colors hover:bg-card/50">
                    {/* Card Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Content */}
                    <div className="relative">
                      <div className="mb-6 inline-block rounded-xl bg-primary/10 p-3">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{method.name}</h3>
                      <p className="mt-2 text-muted-foreground">
                        {method.description}
                      </p>
                      <div className="mt-6">
                        <Button
                          asChild
                          variant="default"
                          className="group/btn relative overflow-hidden bg-primary transition-colors hover:bg-primary/90"
                        >
                          <Link href={method.href} target="_blank">
                            <span>Bağlantıya Git</span>
                            <motion.div
                              className="absolute right-4 inline-block transition-transform group-hover/btn:translate-x-1"
                              initial={false}
                            >
                              <Send className="h-4 w-4" />
                            </motion.div>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Direct Message Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 overflow-hidden rounded-2xl bg-card"
          >
            <div className="relative p-8 md:p-12">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

              {/* Content */}
              <div className="relative flex flex-col items-center text-center">
                <div className="mb-6 rounded-full bg-primary/10 p-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Direkt Mesaj</h3>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Projeleriniz veya iş birliği fırsatları için benimle direkt
                  olarak iletişime geçebilirsiniz. Size en kısa sürede dönüş
                  yapacağım.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="group mt-8 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 hover:from-purple-600 hover:to-blue-600"
                >
                  <Link href="mailto:your@email.com">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>E-posta Gönder</span>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 