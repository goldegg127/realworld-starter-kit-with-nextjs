/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.realworld.io',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
    env: {
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_KEY: process.env.SUPABASE_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    },
    webpack: config => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src');
        return config;
    },
};

module.exports = nextConfig;
