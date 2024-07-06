/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import process from "process";

if (process.env.NODE_ENV !== "production") {
  await import("./src/env.js");
}

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "ireland.apollo.olxcdn.com",
        protocol: "https",
      },
    ],
  },
};

export default config;
