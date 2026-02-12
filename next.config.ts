import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    basePath: '/~phungj',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
