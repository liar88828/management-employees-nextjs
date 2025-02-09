import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
                    },
                ]
            }
        ]
    },

    // logging: {
    //
    //     fetches: {
    //
    //         fullUrl: true,
    //     },
    // },
    experimental: {
        // dynamicIO: true,
        serverActions: {
            bodySizeLimit: '2mb',
            allowedOrigins: [
                'localhost',
                'localhost:3000',
                // "192.168.1.5",
                // "192.168.1.5:3000",
                process.env.NEXT_PUBLIC_URL_PAGE_RAW as string,
                process.env.NEXT_PUBLIC_URL_API_RAW as string
            ]
        },
    },
    // reactStrictMode: true,
    // // Enable the React DevTools profiler
    // profiler: true,
    // reactStrictMode: true,
    modularizeImports: {
        'react-icons': {
            transform: 'react-icons/{{member}}',
        },
    },
    bundlePagesRouterDependencies: true,
    transpilePackages: [ 'lucide-react' ],// add this
    images: {
        remotePatterns: [
            { protocol: "http", hostname: 'localhost', },
            { protocol: "https", hostname: 'dummyimage.com' },
        ],
    },
}

export default nextConfig;
