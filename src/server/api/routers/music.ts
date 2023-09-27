import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { searchTracks } from '@/server/services/spotify'

export const musicRouter = createTRPCRouter({
  searchTracks: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { query } = input
      const { accessToken } = ctx.session

      return await searchTracks(query, accessToken)
    }),
})
