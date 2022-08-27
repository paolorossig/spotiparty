import type { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /** Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context */
  interface Session {
    user: {
      name: string
      email: string
      image: string
      accountId: string
    }
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Record<string, unknown>, DefaultJWT {
    providerAccountId: string
    accessTokenExpiresAt: number
  }
}
