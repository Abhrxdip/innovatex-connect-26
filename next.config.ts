import type { NextConfig } from "next";

//  Suppress Font Warnings
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Failed to find font override values for font')
  ) {
    return;
  }
  originalConsoleWarn(...args);
};

const requiredKeys = [
  'MONGODB_URI',
  'JWT_SECRET',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'JWT_EXPIRES_IN',
  'NODE_ENV',
  'NEXT_PUBLIC_TICKET_AVAILABLE',
  'NEXT_PUBLIC_TICKET_REDIRECT_URL',
  'SITE_URL',
  'GOOGLE_AUTH_CLIENT_ID',
  'GOOGLE_AUTH_CLIENT_SECRET',
  'BREVO_MAIL_API_KEY',
  'REDIS_URL'
];

const missingKeys = requiredKeys.filter(key => !process.env[key]);

if (missingKeys.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingKeys.join(', ')}\nPlease ensure they are set.`
  );
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // Matches all hostnames and domains
      }, {
        protocol: 'https',
        hostname: new URL(process.env.SITE_URL!).hostname,
        pathname: '/**', // Allows all images from this domain
      },

    ],
  },
  allowedDevOrigins: [
    "localhost"
  ],
};

export default nextConfig;