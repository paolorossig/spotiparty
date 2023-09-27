import { musicRouter } from '@/server/api/routers/music'
import { roomsRouter } from '@/server/api/routers/rooms'
import { createTRPCRouter } from '@/server/api/trpc'

export const appRouter = createTRPCRouter({
  rooms: roomsRouter,
  music: musicRouter,
})

export type AppRouter = typeof appRouter
