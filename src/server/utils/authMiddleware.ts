import type { ApiHandler } from 'types/utils'
import { getSession } from 'next-auth/react'
import { getAccountTokens } from 'server/services/auth'

export const authMiddleware: ApiHandler = async (req, res, next) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  const { user } = session
  const { access_token } = await getAccountTokens(user.accountId)

  req.session = { ...user, access_token }

  next()
}
