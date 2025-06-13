import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  async rewrites() {
    return [
      // You can keep this if you need, or omit if not applicable
      // {
      //   source: "/api/:path*",
      //   destination: `${apiURI}api/:path*`,
      // },
    ];
  },
};

export default nextConfig;
