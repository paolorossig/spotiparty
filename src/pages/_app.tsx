import type { AppType } from 'next/app'
import { PusherProvider } from '@harelpls/use-pusher'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { api } from '@/lib/api'
import { config } from '@/lib/pusher'

import '@/styles/globals.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <PusherProvider {...config}>
        <Component {...pageProps} />
      </PusherProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
