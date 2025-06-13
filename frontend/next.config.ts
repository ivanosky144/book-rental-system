import type { NextConfig } from "next";
import apiURI from "./app/api/config";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiURI}api/:path*`,
      },
    ];
  },
};

export default nextConfig;
