import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/.netlify/functions/:path*',
        destination: 'https://services.townlinkglobal.com/.netlify/functions/:path*',
      },
    ];
  },
};

export default nextConfig;
