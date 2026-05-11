import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["@prisma/client", "lucide-react"],
  },
};

export default nextConfig;
