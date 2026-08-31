import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [{ pathname: "/product/**" }, { pathname: "/brand/**" }],
  },
};

export default nextConfig;
