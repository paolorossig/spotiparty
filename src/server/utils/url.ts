const vercelUrl =
  process.env.VERCEL_ENV === 'production'
    ? process.env.PROD_URL
    : process.env.VERCEL_URL

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${vercelUrl}`
