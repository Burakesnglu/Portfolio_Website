'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/app/lib/utils';

const navItems = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Projeler', path: '/admin/projects' },
];

export function AdminHeader({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleSignOut = async () => {
    try {
      const supabase = createClientComponentClient();
      await supabase.auth.signOut();
      toast.success('Çıkış yapıldı');
      router.refresh();
      router.push('/login');
    } catch (error) {
      toast.error('Çıkış yapılırken bir hata oluştu');
    }
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/admin" className="mr-8 flex items-center space-x-2">
          <span className="font-bold">Admin Panel</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.path ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Siteyi Görüntüle
          </Link>
          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </header>
  );
} 