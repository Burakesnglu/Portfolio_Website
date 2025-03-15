import { redirect } from "next/navigation";
import { getUser } from "../lib/auth";
import { AdminHeader } from "../components/layout/AdminHeader";


// Bu dosya dinamik olmalı, statik olarak oluşturulmamalı
export const dynamic = 'force-dynamic';

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