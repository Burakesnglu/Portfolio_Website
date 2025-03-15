/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yceyuupfehyegzeqwlwd.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
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
};

module.exports = nextConfig; 