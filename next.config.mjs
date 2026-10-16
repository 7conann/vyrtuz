/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }, {
      source: '/images/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, must-revalidate' }],
    }, {
      source: '/vyrtuz-motion.mp4',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, must-revalidate' }],
    }]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920],
    imageSizes: [320, 480],
    minimumCacheTTL: 2678400,
  },
}

export default nextConfig
