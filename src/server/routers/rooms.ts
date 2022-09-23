import { z } from 'zod'
import * as trpc from '@trpc/server'
import { nanoid } from 'nanoid'
import { createProtectedRouter } from './context'
import { baseUrl } from 'server/utils'
import { getUserTopTracks } from 'server/services/spotify'

const defaultImageURL: string =
  'https://res.cloudinary.com/paolorossi/image/upload/v1662212920/spotiparty/karaoke_bejniu.jpg'

export const roomsRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      name: z.string(),
      description: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { access_token, accountId, name: owner, image } = ctx.session
      const { name, description } = input

      let room = await ctx.prisma.room.create({
        data: {
          code: nanoid(8),
          name,
          owner,
          accountId,
          description,
          members: [{ accountId, name: owner, image, role: 'owner' }],
          imageUrl: defaultImageURL,
        },
      })

      const linkUrl = `${baseUrl}/app/rooms/${room.code}`
      const ownerTopTracks = await getUserTopTracks(access_token)

      const roomUpdated = await ctx.prisma.room.update({
        where: { id: room.id },
        data: {
          linkUrl,
          tracks: ownerTopTracks,
        },
      })

      if (roomUpdated) {
        room = roomUpdated
      }

      return room
    },
  })
  .query('getAll', {
    resolve: async ({ ctx }) => {
      const { accountId } = ctx.session

      const rooms = await ctx.prisma.room.findMany({
        where: { accountId },
      })

      return rooms
    },
  })
  .query('accessByCode', {
    input: z.object({
      roomCode: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { roomCode } = input
      const { access_token, accountId, name, image } = ctx.session

      let room = await ctx.prisma.room.findUnique({
        where: { code: roomCode },
      })

      if (!room) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: `Room ${roomCode} do not exist`,
        })
      }

      if (!room.members.find((member) => member.accountId === accountId)) {
        const memberTopTracks = await getUserTopTracks(access_token)

        room = await ctx.prisma.room.update({
          where: { id: room.id },
          data: {
            members: [...room.members, { accountId, name, image }],
            tracks: [...room.tracks, ...memberTopTracks],
          },
        })
      }

      return room
    },
  })
