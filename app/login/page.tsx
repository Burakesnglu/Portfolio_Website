import { LoginForm } from '../components/forms/LoginForm';
import { getUser } from '../lib/auth';
import { redirect } from 'next/navigation';

// Bu sayfa dinamik olmalı
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Giriş Yap',
};

export default async function LoginPage() {
  const user = await getUser();

  // Kullanıcı zaten giriş yapmışsa admin sayfasına yönlendir
  if (user) {
    redirect('/admin');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Admin Girişi</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Devam etmek için giriş yapın
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
} 