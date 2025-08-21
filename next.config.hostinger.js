import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable static export for Hostinger compatibility
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

/**
 * Next.js configuration for Hostinger deployment
 * Static export enabled for compatibility with Hostinger
 * Note: API routes won't work with static export
 */
export default nextConfig;
