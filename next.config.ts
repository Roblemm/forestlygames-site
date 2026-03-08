import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Prevent workspace root auto-detection from picking a parent lockfile.
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.wixstatic.com", pathname: "/**" },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
