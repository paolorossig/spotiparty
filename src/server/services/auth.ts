import type { Account } from '@prisma/client'
import type { GetServerSidePropsContext } from 'next'
import type { RichSession } from 'types/utils'

import { unstable_getServerSession as getServerSession } from 'next-auth'
import spotifyApi from 'lib/spotify'
import { prisma } from 'server/db/client'
import { authOptions } from 'pages/api/auth/[...nextauth]'

const provider = 'spotify'

export const getAccountTokens = async (providerAccountId: string) => {
  return await prisma.account.findFirstOrThrow({
    where: { provider, providerAccountId },
    select: { access_token: true, refresh_token: true, expires_at: true },
  })
}

export const updateAccountTokens = async (
  providerAccountId: string,
  data: Partial<Account>
) => {
  return await prisma.account.update({
    where: {
      provider_providerAccountId: { provider, providerAccountId },
    },
    data,
  })
}

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    spotifyApi.setRefreshToken(refreshToken)
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return refreshedToken
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error.message)
  }
}

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  const serverSession = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!serverSession) return null

  const { user } = serverSession
  const { access_token } = await getAccountTokens(user.accountId)
  return { ...user, access_token } as RichSession
}
