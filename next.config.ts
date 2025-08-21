import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove static export for Vercel deployment
  // output: 'export', // Commented out for Vercel compatibility
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  // Add proper Vercel settings
  experimental: {
    appDir: true,
  },
};

/**
 * Next.js configuration for Vercel deployment
 * Static export is disabled to enable proper server-side rendering
 */
export default nextConfig;
