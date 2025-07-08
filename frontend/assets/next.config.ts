import type { NextConfig } from "next";

const DOMAIN_URL = process.env.DOMAIN_URL || ""

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [DOMAIN_URL]
    }
  }
};

export default nextConfig;
