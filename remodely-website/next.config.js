/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.prod.website-files.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: '',
                pathname: '/**',
            },
        ],
        formats: ['image/webp', 'image/avif'],
        minimumCacheTTL: 3600, // Cache for 1 hour for better mobile performance
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Disable image optimization in production for Render.com compatibility
        unoptimized: process.env.NODE_ENV === 'production',
    },
    // Disable all experimental features to prevent critters dependency
    experimental: {},
    // Optimize for production builds but disable CSS optimization
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Production-specific optimizations for Render.com
    output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
    // Disable CSS optimization to prevent critters requirement
    optimizeFonts: false,
}

module.exports = nextConfig
