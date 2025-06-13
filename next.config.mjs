/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard/image-gen',
        destination: '/image-gen',
        permanent: true,
      },
      {
        source: '/dashboard/video-gen',
        destination: '/video-gen',
        permanent: true,
      },
      {
        source: '/dashboard/canvas',
        destination: '/image-gen',
        permanent: true,
      },
      {
        source: '/dashboard/upscaler',
        destination: '/image-gen',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
