import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local images from public folder
    formats: ["image/avif", "image/webp"],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
