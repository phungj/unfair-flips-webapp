import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/~phungj/unfair-flips',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
