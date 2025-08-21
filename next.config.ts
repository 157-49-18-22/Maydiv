import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable static export for Hostinger deployment
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

/**
 * Next.js configuration for both Vercel and Hostinger deployment
 * Static export enabled for compatibility with both platforms
 */
export default nextConfig;
