import type { ApiHandler } from 'types/utils'
import { getServerAuthSession } from 'server/services/auth'

export const authMiddleware: ApiHandler = async (req, res, next) => {
  const session = await getServerAuthSession({ req, res })

  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  req.session = session

  next()
}
