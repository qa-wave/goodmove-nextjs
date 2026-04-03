/** @type {import('next').NextConfig} */
const nextConfig = {
  // WordPress media images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'goodmove.cz',
        pathname: '/wp-content/uploads/**',
      },
      {
        // Allow placeholder images during development
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Trailing slashes to match WordPress URL structure
  trailingSlash: false,
}

module.exports = nextConfig
