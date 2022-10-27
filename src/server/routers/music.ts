import { z } from 'zod'
import { createProtectedRouter } from './context'
import { searchTracks } from 'server/services/spotify'

export const musicRouter = createProtectedRouter().query('searchTracks', {
  input: z.object({
    query: z.string(),
  }),
  resolve: async ({ ctx, input }) => {
    const { query } = input
    const { access_token } = ctx.session

    return await searchTracks(query, access_token)
  },
})
