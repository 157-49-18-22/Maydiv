import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable static export for both Vercel and Hostinger compatibility
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  // Remove invalid experimental property that was causing build failure
};

/**
 * Next.js configuration for both Vercel and Hostinger deployment
 * Static export enabled for compatibility with both platforms
 * Vercel can handle static exports perfectly
 */
export default nextConfig;
