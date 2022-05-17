import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export type CustomApiReq = NextApiRequest & { session: any }

const authMiddleware = async (req: CustomApiReq, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  req.session = session.user
}

export default authMiddleware
