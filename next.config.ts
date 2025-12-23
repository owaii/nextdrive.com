import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/nextdrive.com",
  assetPrefix: "/nextdrive.com",

  reactCompiler: true,
};

export default nextConfig;
