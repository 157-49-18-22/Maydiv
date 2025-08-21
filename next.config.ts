import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove static export to enable API routes on Vercel
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

/**
 * Next.js configuration for Vercel deployment
 * API routes enabled for authentication functionality
 */
export default nextConfig;
