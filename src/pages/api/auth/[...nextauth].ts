import NextAuth, { type NextAuthOptions } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from 'server/db/client'
import {
  getAccountTokens,
  refreshAccessToken,
  updateAccountTokens,
} from 'server/services/auth'
import { LOGIN_URL } from 'lib/spotify'

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
  },
  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      if (user && account) {
        const { expires_at, providerAccountId } = account

        if (isNewUser) {
          console.log('New user signed:', user.name)
        } else {
          console.log('User signed:', user.name)
          await updateAccountTokens(providerAccountId, account)
        }

        return {
          ...token,
          providerAccountId,
          accessTokenExpiresAt: expires_at as number,
        }
      }

      if (Date.now() > token.accessTokenExpiresAt * 1000) {
        console.log('Access Token expired')
        const { providerAccountId } = token

        const { refresh_token } = await getAccountTokens(providerAccountId)
        const refreshedTokenResponse = await refreshAccessToken(refresh_token)

        const { expires_in, ...newToken } = refreshedTokenResponse
        const expires_at = Date.now() + expires_in * 1000

        await updateAccountTokens(providerAccountId, {
          ...newToken,
          expires_at,
        })

        return {
          ...token,
          accessTokenExpiresAt: expires_at,
        }
      }

      return token
    },
    async session({ session, token }) {
      session.user.accountId = token.providerAccountId

      return session
    },
  },
}

export default NextAuth(authOptions)
