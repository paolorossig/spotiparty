import type { DefaultSession, Account as NextAuthAccount } from 'next-auth'

export type SupportedProviders = 'spotify' | 'google'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      name: string
      email: string
      image?: string | null
      id: string
    }
    provider: SupportedProviders
    accessToken: string
  }

  interface Account extends NextAuthAccount {
    access_token: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Record<string, unknown> {
    name: string
    email: string
    picture?: string | null
    sub: string
    // extra properties
    provider: SupportedProviders
    accessToken: string
  }
}
