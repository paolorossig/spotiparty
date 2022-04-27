import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { refreshAccessToken } from '../../../lib/auth'
import { LOGIN_URL } from '../../../lib/spotify'

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
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
