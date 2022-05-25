import type { NextHandler } from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export type CustomApiReq = NextApiRequest & { session?: any }

export const authMiddleware = async (
  req: CustomApiReq,
  res: NextApiResponse,
  next: NextHandler
) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  req.session = session.user
  next()
}
