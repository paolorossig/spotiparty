import { type Account } from '@prisma/client'
import { type GetServerSidePropsContext } from 'next'
import { unstable_getServerSession as getServerSession } from 'next-auth'

import { prisma } from 'server/db/client'
import { type RichSession } from 'types/utils'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export const getAccountTokens = async (providerAccountId: string) => {
  return await prisma.account.findFirstOrThrow({
    where: { providerAccountId },
    select: { access_token: true, refresh_token: true, expires_at: true },
  })
}

export const updateAccountTokens = async (
  data: Partial<Account> & { provider: string; providerAccountId: string }
) => {
  const { provider, providerAccountId } = data
  const provider_providerAccountId = { provider, providerAccountId }

  return await prisma.account.update({
    where: { provider_providerAccountId },
    data,
  })
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
