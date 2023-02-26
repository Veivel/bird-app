/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "ik.imagekit.io"
        ]
    }
}

module.exports = nextConfig
