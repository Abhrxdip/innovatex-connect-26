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
  'NEXT_PUBLIC_TICKET_AVAILABLE',
  'NEXT_PUBLIC_TICKET_REDIRECT_URL',
  'SITE_URL',
  'GOOGLE_AUTH_CLIENT_ID',
  'GOOGLE_AUTH_CLIENT_SECRET',
  'BREVO_MAIL_API_KEY',
  'REDIS_URL',
  'MAILTRAP_TOKEN',
  'MAILTRAP_SENDER_MAIL',
  'RAZOR_PAY_WEBHOOK_SECRET',
  'RAZOR_PAY_KEY_ID',
  'RAZOR_PAY_KEY_SECRET',
  'TICKET_PRICE_IN_INR',
];

const isProd = process.env.NODE_ENV === 'production';
const missingKeys = requiredKeys.filter((key) => !process.env[key]);

if (isProd && missingKeys.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingKeys.join(', ')}\nPlease ensure they are set.`
  );
}

const siteUrl = process.env.SITE_URL || 'http://localhost:3000';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com', // Google user content CDN
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com', // Google Drive direct/thumbnail links
      },
      {
        protocol: 'https',
        hostname: '*.workers.dev', // Cloudflare Workers endpoints
      },
      {
        protocol: 'https',
        hostname: new URL(siteUrl).hostname,
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',

      }
    ],
  },
  allowedDevOrigins: ['localhost'],
};

export default nextConfig;
