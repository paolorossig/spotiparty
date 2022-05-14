import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /** Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context */
  interface Session {
    user: {
      accessToken: string
      refreshToken: string
      accountId: string
    } & DefaultSession['user']
  }

  interface Account {
    expires_at: number
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string
    refreshToken: string
    accountId: string
    accessTokenExpires: number
  }
}
