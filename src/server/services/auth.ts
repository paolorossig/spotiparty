import type { Account } from '@prisma/client'
import { prisma } from 'server/db/client'
import spotifyApi from 'lib/spotify'

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
