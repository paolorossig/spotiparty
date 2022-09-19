import superjson from 'superjson'
import { createRouter } from './context'
import { roomsRouter } from './rooms'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('rooms.', roomsRouter)

export type AppRouter = typeof appRouter
