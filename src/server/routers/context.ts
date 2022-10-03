import * as trpc from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { prisma } from 'server/db/client'
import { getServerAuthSession, type RichSession } from 'server/services/auth'

export const createContextInner = async (opts: {
  session: RichSession | null
}) => {
  return {
    session: opts.session,
    prisma,
  }
}

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { req, res } = opts

  const session = await getServerAuthSession({ req, res })

  return await createContextInner({ session })
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()

export const createProtectedRouter = () =>
  createRouter().middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    return next({
      ctx: {
        ...ctx,
        // infers that `session` is non-nullable to downstream resolvers
        session: { ...ctx.session },
      },
    })
  })
