/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [320, 420, 768, 1024, 1200],
    loader: 'default',
    path: '/_next/image',
    loader: 'default',
    formats: ['image/webp', 'image/avif'],
    domains: ['image.tmdb.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/original',
      },
    ],
  },
}

module.exports = nextConfig;
