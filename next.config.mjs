/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io'
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io'
            },
            {
                protocol: 'https',
                hostname: 'source.unsplash.com'
            }
        ]
    }
};

export default nextConfig;