import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // 90 for full-bleed photography and screenshots, 75 (the default) for everything else.
    qualities: [75, 90],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
