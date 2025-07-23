import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://blog-images.s3.bitiful.net/**"),
    ],
  }
};

export default nextConfig;
