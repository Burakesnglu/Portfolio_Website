/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['vceyuupfzhyegzeqwlwd.supabase.co', 'yceyuupfehyegzeqwlwd.supabase.co', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: true
  },
  typescript: {
    // !! WARN !!
    // Bu sadece build aşamasında TypeScript hatalarını bastırır
    // Tiplemede sorun olduğunda projenizi kontrol etmeyi unutmayın
    ignoreBuildErrors: true,
  },
  eslint: {
    // Hataları görmezden gel, sadece uyarıları göster
    ignoreDuringBuilds: true,
  },
  // ISR ve SSG davranışını konfigüre edelim
  experimental: {
    // Bu seçenek, Next.js'nin tarayıcı API'larını server tarafında 
    // kullanırken hata vermesini engeller, sadece uyarı gösterir
    appDocumentPreloading: false,
  },
};

module.exports = nextConfig; 