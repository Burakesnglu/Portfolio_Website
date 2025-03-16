'use client';
 
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { Button } from '../ui';
import Link from 'next/link'; 

const contactMethods = [
  {
    name: 'GitHub',
    href: 'https://github.com/Burakesnglu',
    icon: Github,
    description: 'Projelerimi ve kaynak kodlarımı inceleyin',
    color: 'bg-slate-700/10 text-slate-700 dark:bg-slate-300/10 dark:text-slate-300',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/burakesnglu/',
    icon: Linkedin,
    description: 'Profesyonel profilimi ziyaret edin',
    color: 'bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400',
  },
  {
    name: 'Email',
    href: 'mailto:burakesngluu@gmail.com',
    icon: Mail,
    description: 'İş birlikleri ve projeler için iletişime geçin',
    color: 'bg-blue-500/10 text-blue-500 dark:bg-blue-300/10 dark:text-blue-300',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 bg-background overflow-hidden">
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
            İletişime Geçin
          </h2>
          <p className="text-muted-foreground text-lg">
            Projeleriniz için iş birliği yapmak veya sorularınız için benimle iletişime geçebilirsiniz.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm p-8 transition-colors hover:bg-card/50 hover:border-border/60 shadow-sm">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative">
                    <div className={`mb-6 inline-block rounded-xl p-3 ${method.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-medium">{method.name}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {method.description}
                    </p>
                    <div className="mt-6">
                      <Button
                        asChild
                        variant="default"
                        className="group/btn relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Link href={method.href} target="_blank" className="flex items-center gap-2">
                          <span>Bağlantıya Git</span>
                          <motion.div
                            className="inline-block transition-transform group-hover/btn:translate-x-1"
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
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 overflow-hidden rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm shadow-sm"
        >
          <div className="relative p-8 md:p-12">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />

            {/* Content */}
            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-medium">Direkt Mesaj</h3>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Projeleriniz veya iş birliği fırsatları için benimle direkt
                olarak iletişime geçebilirsiniz. Size en kısa sürede dönüş
                yapacağım.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 bg-gradient-to-r from-purple-500/90 to-blue-500/90 hover:from-purple-600/90 hover:to-blue-600/90 text-white"
              >
                <Link href="mailto:burakesngluu@gmail.com" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>E-posta Gönder</span>
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 