import { PusherProviderProps } from '@harelpls/use-pusher'
import { Session } from 'next-auth'

import { env } from '@/env.mjs'

export type ChannelMembersMe = {
  id: string
  info: Omit<Session['user'], 'id'>
}

export const config: PusherProviderProps = {
  clientKey: env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  authEndpoint: '/api/pusher/auth',
}
