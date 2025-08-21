/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static export for Hostinger deployment
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  // Disable features that don't work with static export
  experimental: {
    appDir: false,
  },
};

/**
 * Next.js configuration for Hostinger static deployment
 * This creates a static build that can be uploaded via FTP
 */
module.exports = nextConfig;
