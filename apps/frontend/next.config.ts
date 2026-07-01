import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    dirs: ['<rootDir>'],
  },
  images: {
    remotePatterns: [
      { hostname: 'unsplash.com' },
      { hostname: 'media.istockphoto.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'plus.unsplash.com' },
      { hostname: 'imge.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/courses',
      },
    ]
  },
}

export default nextConfig
