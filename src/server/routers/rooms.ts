import { z } from 'zod'
import * as trpc from '@trpc/server'
import { nanoid } from 'nanoid'
import { createProtectedRouter } from './context'

const defaultImageURL: string =
  'https://res.cloudinary.com/paolorossi/image/upload/v1662212920/spotiparty/karaoke_bejniu.jpg'

export const roomsRouter = createProtectedRouter()
  .mutation('create', {
    input: z.object({
      name: z.string(),
      description: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { userId } = ctx.session

      const room = await ctx.prisma.room.create({
        data: {
          roomId: nanoid(8),
          userId,
          imageUrl: defaultImageURL,
          ...input,
        },
      })

      return room
    },
  })
  .mutation('update', {
    input: z.object({
      roomId: z.string(),
      name: z.string(),
      description: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { userId } = ctx.session

      const room = await ctx.prisma.room.update({
        where: { roomId: input.roomId },
        data: { userId, ...input },
      })

      return room
    },
  })
  .query('getCreated', {
    resolve: async ({ ctx }) => {
      const { userId } = ctx.session

      const rooms = await ctx.prisma.room.findMany({
        where: { userId },
      })

      return rooms
    },
  })
  .query('getJoined', {
    resolve: async ({ ctx }) => {
      const { userId } = ctx.session

      const members = await ctx.prisma.member.findMany({
        where: { id: userId },
        select: { room: true },
      })

      const rooms = members.map(({ room }) => room)

      return rooms
    },
  })
  .query('accessByRoomId', {
    input: z.object({
      roomId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      const { roomId } = input

      const room = await ctx.prisma.room.findUnique({
        where: { roomId },
        include: { members: true },
      })

      if (!room) {
        throw new trpc.TRPCError({
          code: 'NOT_FOUND',
          message: 'The room you are trying to access does not exist',
        })
      }

      const { userId } = ctx.session

      let role = ''
      if (room.userId === userId) {
        role = 'owner'
      } else if (room.members.some((member) => member.userId === userId)) {
        role = 'member'
      }

      if (!role) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: `You do not have access for room ${roomId}`,
        })
      }

      return { room, role }
    },
  })
