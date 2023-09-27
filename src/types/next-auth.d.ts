import type { DefaultSession, Account as NextAuthAccount } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      id: string
    }
    accessToken: string
  }

  interface Account extends NextAuthAccount {
    access_token: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Record<string, unknown>, DefaultJWT {
    sub: string
    accessToken: string
  }
}
