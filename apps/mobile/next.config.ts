import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@townlink/api-client", "@townlink/core", "@townlink/ui"],
  images: {
    unoptimized: true,
  },
  // Proxy API calls during dev to avoid CORS.
  // In production (static export), rewrites are ignored — but Capacitor's
  // WebView doesn't enforce CORS, so direct calls work fine.
  async rewrites() {
    return [
      {
        source: "/.netlify/functions/:path*",
        destination:
          "https://services.townlinkglobal.com/.netlify/functions/:path*",
      },
    ];
  },
};

export default nextConfig;
