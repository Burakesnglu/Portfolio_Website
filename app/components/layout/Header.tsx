'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Hakkımda', href: '#about' },
  { name: 'Projeler', href: '#projects' },
  { name: 'İletişim', href: '#contact' },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 0);
    });
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b bg-background/80 backdrop-blur-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-xl font-bold text-transparent"
        >
          Portfolio
        </Link>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="relative h-9 w-9 overflow-hidden rounded-full"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {mounted ? (
              theme === 'dark' ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-4 w-4" />
                </motion.div>
              )
            ) : null}
          </div>
        </Button>
      </div>
    </motion.header>
  );
} 