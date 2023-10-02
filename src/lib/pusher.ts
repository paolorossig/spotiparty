import Pusher from 'pusher-js'

import { env } from '@/env.mjs'

Pusher.logToConsole = !!process.env.PUSHER_LOGS_ENABLED

export const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
  channelAuthorization: {
    endpoint: '/api/pusher/auth',
    transport: 'ajax',
  },
})
