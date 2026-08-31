import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    localPatterns: [{ pathname: "/product/**" }, { pathname: "/brand/**" }],
  },
};

export default nextConfig;
