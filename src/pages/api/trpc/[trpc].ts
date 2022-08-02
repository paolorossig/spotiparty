import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from 'server/routers'
import { createContext } from 'server/routers/context'

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
})
