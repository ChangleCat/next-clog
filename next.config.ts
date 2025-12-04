import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL("https://blog-images.s3.bitiful.net/**"),
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/artalk/:path*",
        destination: "https://api.changlecat.me/artalk/:path*"
      }
    ]
  },
};

export default nextConfig;
