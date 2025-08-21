import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove static export for Vercel deployment
  // output: 'export', // Commented out for Vercel compatibility
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  // Remove invalid experimental property that was causing build failure
};

/**
 * Next.js configuration for Vercel deployment
 * Static export is disabled to enable proper server-side rendering
 */
export default nextConfig;
