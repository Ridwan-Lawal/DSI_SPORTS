import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/daetxhtss/**",
      },
      {
        protocol: "https",
        hostname: "crests.football-data.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
