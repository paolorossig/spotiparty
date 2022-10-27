import superjson from 'superjson'
import { createRouter } from './context'
import { roomsRouter } from './rooms'
import { musicRouter } from './music'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('rooms.', roomsRouter)
  .merge('music.', musicRouter)

export type AppRouter = typeof appRouter
