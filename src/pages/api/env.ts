import { NextApiHandler } from 'next'

const handler: NextApiHandler = (req, res) => {
  const node_env = process.env.NODE_ENV
  const vercel_env = process.env.VERCEL_ENV
  const vercel_url = process.env.VERCEL_URL

  res.status(200).json({ node_env, vercel_env, vercel_url })
}

export default handler
