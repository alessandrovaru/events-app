/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/__/auth',
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth`
      },
      {
        source: '/__/auth/:path*',
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth/:path*`
      },
      {
        source: '/__/firebase/init.json',
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/firebase/init.json`
      }
    ];
  },
  env: {
    VERCEL: process.env.VERCEL
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ]
  }
};

export default nextConfig;
