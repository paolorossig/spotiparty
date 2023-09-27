import { createTRPCRouter } from 'server/api/trpc'
import { roomsRouter } from 'server/api/routers/rooms'
import { musicRouter } from 'server/api/routers/music'

export const appRouter = createTRPCRouter({
  rooms: roomsRouter,
  music: musicRouter,
})

export type AppRouter = typeof appRouter
