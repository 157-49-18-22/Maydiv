import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Remove static export for admin dashboard functionality
  // output: 'export', // Commented out to enable API routes
  images: {
    unoptimized: true,
  },
};

/**
 * Next.js configuration
 * Note: Static export is disabled to enable API routes for admin dashboard
 */
export default nextConfig;
