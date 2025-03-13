import { redirect } from 'next/navigation';

export default function Home() {
  // Ana sayfayı portfolio sayfasına yönlendir
  redirect('/portfolio');
} 