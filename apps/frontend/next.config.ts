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
}

export default nextConfig
