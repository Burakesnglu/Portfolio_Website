import React from 'react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';

const adminNavItems = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Projects', path: '/admin/projects' },
  { name: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/admin" className="font-semibold mr-8">
            Admin Panel
          </Link>
          <nav className="flex items-center space-x-6">
            {adminNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-sm font-medium transition-colors hover:text-primary"
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
              View Site
            </Link>
            <Link
              href="/api/auth/signout"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        {children}
      </main>
    </div>
  );
} 