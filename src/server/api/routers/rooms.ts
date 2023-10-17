import { TRPCError } from '@trpc/server'
import { customAlphabet } from 'nanoid'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { RoomEvents } from '@/server/constants/events'
import { pusher } from '@/server/lib/pusher'

const defaultImageURL =
  'https://res.cloudinary.com/paolorossi/image/upload/v1662212920/spotiparty/karaoke_bejniu.jpg'
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet)

export const roomsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: ownerId } = ctx.session.user

      return ctx.db.room.create({
        data: {
          roomId: nanoid(8),
          ownerId,
          imageUrl: defaultImageURL,
          ...input,
          members: {
            connect: {
              id: ownerId,
            },
          },
        },
      })
    }),

  update: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.room.update({
        where: { roomId: input.roomId },
        data: input,
      })
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUniqueOrThrow({
      where: { id: ctx.session.user.id },
      select: { rooms: true },
    })
  }),

  getCreated: protectedProcedure.query(({ ctx }) => {
    return ctx.db.room.findMany({
      where: { ownerId: ctx.session.user.id },
      select: { roomId: true, name: true, imageUrl: true },
    })
  }),

  getJoined: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user

    return ctx.db.room.findMany({
      where: {
        memberIds: { hasSome: [userId] },
        AND: { NOT: { ownerId: userId } },
      },
      select: {
        roomId: true,
        name: true,
        imageUrl: true,
      },
    })
  }),

  getByRoomId: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { roomId } = input

      const room = await ctx.db.room.findUnique({
        where: { roomId },
      })

      if (!room) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message:
            'Room not found|The room you are trying to access does not exist',
        })
      }

      const { id: userId } = ctx.session.user

      let role = ''
      if (room.ownerId === userId) {
        role = 'owner'
      } else if (room.memberIds.includes(userId)) {
        role = 'member'
      }

      if (!role) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `Unauthorized|You do not have access for room ${roomId}`,
        })
      }

      return { room, role }
    }),

  accessByRoomId: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { roomId } = input

      const room = await ctx.db.room.findUnique({
        where: { roomId },
      })

      if (!room) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message:
            'Room not found|The room you are trying to access does not exist',
        })
      }

      const { id: userId } = ctx.session.user

      if (room.memberIds.includes(userId)) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `A conflic occured|You are already a member of room ${roomId}`,
        })
      }

      await ctx.db.room.update({
        where: { roomId },
        data: { members: { connect: { id: userId } } },
      })
    }),

  getMembers: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { roomId } = input

      const room = await ctx.db.room.findUnique({
        where: { roomId },
        select: { ownerId: true, members: true },
      })

      if (!room) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message:
            'Room not found|The room you are trying to access does not exist',
        })
      }

      const owner = room.members
        .filter((user) => user.id === room.ownerId)
        .map((user) => ({ user, role: 'owner' }))
      const members = room.members
        .filter((user) => user.id !== room.ownerId)
        .map((user) => ({ user, role: 'member' }))

      return [...owner, ...members]
    }),
  changePlaybackState: protectedProcedure
    .input(
      z.object({
        channel: z.string(),
        trackUri: z.string().startsWith('spotify:'),
      }),
    )
    .mutation(({ input }) => {
      pusher.trigger(input.channel, RoomEvents.ChangePlayback, {
        trackUri: input.trackUri,
      })
    }),
})
