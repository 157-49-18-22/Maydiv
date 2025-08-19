import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Enable static export for Hostinger deployment
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable trailing slash for better compatibility
  trailingSlash: false,
};

/**
 * Next.js configuration
 * Note: Static export is disabled to enable API routes for admin dashboard
 */
export default nextConfig;
