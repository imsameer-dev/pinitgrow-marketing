import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.pinitgrow.com" }],
      destination: "https://pinitgrow.com/:path*",
      permanent: true,
    },
  ],
  images: {
    localPatterns: [{ pathname: "/product/**" }, { pathname: "/brand/**" }],
  },
};

export default nextConfig;
