import { getUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/app/components/layout/AdminHeader';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} />
      <main className="container mx-auto p-6 pt-20">{children}</main>
    </div>
  );
} 