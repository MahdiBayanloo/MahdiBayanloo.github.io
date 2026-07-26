import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (user site, served at domain root)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
