import type { ApiHandler } from 'types/utils'
import { getSession } from 'next-auth/react'

export const authMiddleware: ApiHandler = async (req, res, next) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  req.session = session.user
  next()
}
