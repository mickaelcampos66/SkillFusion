import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    dirs: ['<rootDir>'],
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
