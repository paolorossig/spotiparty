import { GetServerSidePropsContext } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession, type Account, type NextAuthOptions } from 'next-auth'
import { type JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'
import SpotifyProvider from 'next-auth/providers/spotify'

import { env } from '@/env.mjs'
import { LOGIN_URL } from '@/lib/spotify'
import { db } from '@/server/db'
import { type SupportedProviders } from '@/types/next-auth'

const extendJWT = (token: JWT, account: Account): JWT => {
  return {
    ...token,
    provider: account.provider as SupportedProviders,
    accessToken: account.access_token,
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    SpotifyProvider({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 59, // minutes
  },
  callbacks: {
    jwt: async ({ token, account, trigger }) => {
      if (!account || (trigger !== 'signIn' && trigger !== 'signUp')) {
        return token
      }

      if (trigger === 'signUp') {
        return extendJWT(token, account)
      }

      if (trigger === 'signIn') {
        const { provider, providerAccountId } = account
        const provider_providerAccountId = { provider, providerAccountId }

        await db.account.update({
          where: { provider_providerAccountId },
          data: account,
        })

        return extendJWT(token, account)
      }

      return token
    },
    session: ({ session, token }) => {
      session.user = { ...session.user, id: token.sub }
      session.provider = token.provider
      session.accessToken = token.accessToken

      return session
    },
  },
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
