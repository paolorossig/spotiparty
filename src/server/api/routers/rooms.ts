import { TRPCError } from '@trpc/server'
import { nanoid } from 'nanoid'
import { z } from 'zod'

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from 'server/api/trpc'

const defaultImageURL =
  'https://res.cloudinary.com/paolorossi/image/upload/v1662212920/spotiparty/karaoke_bejniu.jpg'

export const roomsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      }
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user

      const room = await ctx.db.room.create({
        data: {
          roomId: nanoid(8),
          userId,
          imageUrl: defaultImageURL,
          ...input,
        },
      })

      return room
    }),

  update: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        active: z.boolean().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.room.update({
        where: { roomId: input.roomId },
        data: input,
      })
    }),

  getCreated: protectedProcedure.query(({ ctx }) => {
    const { id: userId } = ctx.session.user

    return ctx.db.room.findMany({
      where: { userId },
      select: { roomId: true, name: true, imageUrl: true },
    })
  }),

  getJoined: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user

    const members = await ctx.db.member.findMany({
      where: { id: userId },
      select: {
        room: { select: { roomId: true, name: true, imageUrl: true } },
      },
    })

    return members.map(({ room }) => room)
  }),

  getByRoomId: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { roomId } = input

      const room = await ctx.db.room.findUnique({
        where: { roomId },
        include: { members: true },
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
      if (room.userId === userId) {
        role = 'owner'
      } else if (room.members.some((member) => member.userId === userId)) {
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
        include: { members: true },
      })

      if (!room) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message:
            'Room not found|The room you are trying to access does not exist',
        })
      }

      const { id: userId } = ctx.session.user

      if (room.members.some((member) => member.userId === userId)) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `A conflic occured|You are already a member of room ${roomId}`,
        })
      }

      await ctx.db.member.create({
        data: { roomId, userId },
      })
    }),

  getToken: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { roomId } = input

      const room = await ctx.db.room.findUnique({
        where: { roomId },
        select: {
          active: true,
          user: {
            select: {
              accounts: {
                select: { access_token: true },
                where: { provider: 'spotify' },
              },
            },
          },
        },
      })

      if (!room) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message:
            'Room not found|The room you are trying to access does not exist',
        })
      }

      if (!room.active) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: `Unauthorized|Room ${roomId} is not active`,
        })
      }

      return room.user.accounts[0].access_token
    }),

  getMembers: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { roomId } = input

      const room = await ctx.db.room.findUnique({
        where: { roomId },
        select: { user: true, members: { select: { user: true } } },
      })

      if (!room) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message:
            'Room not found|The room you are trying to access does not exist',
        })
      }

      const members = room.members.map(({ user }) => ({ user, role: 'member' }))
      const owner = { user: room.user, role: 'owner' }

      return [...members, owner]
    }),
})
