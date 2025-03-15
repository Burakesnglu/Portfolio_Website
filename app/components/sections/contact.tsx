'use client';
 
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageSquare, Send, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Button, Input, Textarea } from '../ui';
import Link from 'next/link'; 

const contactMethods = [
  {
    name: 'E-posta',
    href: 'mailto:your@email.com',
    icon: Mail,
    description: 'İş teklifleri ve projeler için iletişime geçin',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: Linkedin,
    description: 'Profesyonel bağlantılar kurun',
    color: 'bg-blue-600/10 text-blue-600',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: Github,
    description: 'Açık kaynak projeler ve katkılar',
    color: 'bg-slate-700/10 text-slate-700',
  },
];

const additionalDetails = [
  {
    icon: MapPin,
    label: 'Konum',
    value: 'İstanbul, Türkiye',
    color: 'text-rose-500',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+90 (555) 123 4567',
    color: 'text-emerald-500',
  },
  {
    icon: Mail,
    label: 'E-posta',
    value: 'your@email.com',
    color: 'text-blue-500',
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

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <div className="rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm shadow-sm p-6">
              <h3 className="text-xl font-medium mb-6">İletişim Bilgileri</h3>
              
              <div className="space-y-6">
                {additionalDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <div key={detail.label} className="flex items-start gap-4">
                      <div className={`rounded-md p-2.5 ${detail.color} bg-muted/40`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{detail.label}</div>
                        <div className="font-medium">{detail.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8 border-t border-border/60 pt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Sosyal Medya</h4>
                <div className="flex gap-4">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.a
                        key={method.name}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background hover:bg-muted/40 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={method.name}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm shadow-sm p-6">
              <h3 className="text-xl font-medium mb-4">İş Saatleri</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Pazartesi - Cuma</span>
                  <span className="font-medium">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-border/40">
                  <span className="text-muted-foreground">Cumartesi</span>
                  <span className="font-medium">10:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-border/40">
                  <span className="text-muted-foreground">Pazar</span>
                  <span className="font-medium">Kapalı</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm shadow-sm p-6"
          >
            <h3 className="text-xl font-medium mb-6">Mesaj Gönderin</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    İsim
                  </label>
                  <Input id="name" placeholder="İsminiz" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-posta
                  </label>
                  <Input id="email" placeholder="E-posta adresiniz" type="email" className="bg-background/50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Konu
                </label>
                <Input id="subject" placeholder="Mesajınızın konusu" className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mesaj
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Nasıl yardımcı olabilirim?" 
                  className="min-h-[120px] bg-background/50" 
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="mr-2 h-4 w-4" />
                Mesaj Gönder
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-4">
                Gönder butonuna tıklayarak, kişisel verilerinizin işlenmesini kabul etmiş olursunuz.
              </p>
            </form>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 rounded-lg border border-border/40 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-sm p-8 text-center"
        >
          <h3 className="text-2xl font-medium mb-4">Freelance Çalışmayla İlgileniyor musunuz?</h3>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-6">
            Kısa veya uzun vadeli projeleriniz için profesyonel çözümler üretebilirim. Hedeflerinize ulaşmak için hemen iletişime geçin.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="mailto:your@email.com" className="flex items-center gap-2">
              <span>Hemen İletişime Geçin</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 