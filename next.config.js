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
  // Transpile modülleri
  transpilePackages: [],
  // Webpack yapılandırması
  webpack: (config, { isServer }) => {
    // Webpack yapılandırmasını özelleştir
    return config;
  },
};

module.exports = nextConfig; 