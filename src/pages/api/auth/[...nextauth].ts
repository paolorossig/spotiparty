import NextAuth, { type NextAuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { LOGIN_URL } from 'lib/spotify'
import { prisma } from 'server/db/client'
import { getAccountTokens, updateAccountTokens } from 'server/services/auth'
import { refreshSpotifyTokens } from 'server/services/spotify'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 3600,
  },
  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      if (user && account) {
        const { expires_at, provider, providerAccountId } = account

        if (isNewUser) {
          console.log('New user signed:', user.name)
        } else {
          console.log('User signed:', user.name)
          await updateAccountTokens(account)
        }

        return {
          ...token,
          // TODO: next-auth already include it as `sub` optional parameter
          userId: user.id,
          provider,
          providerAccountId,
          accessTokenExpiresAt: expires_at as number,
        }
      }

      if (Date.now() > token.accessTokenExpiresAt) {
        console.log('Access Token expired')
        const { provider, providerAccountId } = token
        const { refresh_token } = await getAccountTokens(providerAccountId)

        // TODO: refresh token depending on `provider`
        const response = await refreshSpotifyTokens(refresh_token)
        if (!response) return token

        const { expires_in, ...refreshedToken } = response
        const expires_at = Date.now() + expires_in * 1000
        const newToken = {
          provider,
          providerAccountId,
          expires_at,
          ...refreshedToken,
        }

        await updateAccountTokens(newToken)

        return {
          ...token,
          accessTokenExpiresAt: expires_at,
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user.userId = token.userId
      session.user.accountId = token.providerAccountId

      return session
    },
  },
}

export default NextAuth(authOptions)
