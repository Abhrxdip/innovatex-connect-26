export const isProd = process.env.NODE_ENV === "production";
export const redirectHost = isProd ? process.env.SITE_URL! : "http://localhost:3000"