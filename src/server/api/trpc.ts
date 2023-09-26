import { initTRPC } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { db } from 'server/db'

// CONTEXT

const createInnerTRPCContext = () => {
  return {
    db,
  }
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  return createInnerTRPCContext()
}

// INITIALIZATION

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

// ROUTER & PROCEDURES

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure
