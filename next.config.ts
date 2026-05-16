import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack to this project so it doesn't pick up unrelated parent
  // lockfiles when multiple are present higher up in the filesystem.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
