import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["80-cs-193857718008-default.cs-europe-west4-pear.cloudshell.dev"]
    }
  }
};

export default nextConfig;
