import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    dirs: ['<rootDir>'],
  },
  images: {
    domains: [
      'unsplash.com',
      'media.istockphoto.com',
      'images.unsplash.com',
      'plus.unsplash.com',
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
