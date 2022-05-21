import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from 'core/mongodb'
import { LOGIN_URL } from 'core/spotify'
import { refreshAccessToken } from 'lib/server/utils/auth'

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
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
    async jwt({ token, account, user }) {
      if (account && user) {
        console.log('Initial User Sign In')
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accountId: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }

      if (Date.now() < token.accessTokenExpires) {
        console.log('Existing Access token is valid')
        return token
      }

      console.log('Access Token has expired, refreshing...')
      return await refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.accountId = token.accountId

      return session
    },
  },
})
