import type { ApiHandler } from 'types/utils'
import { prisma } from 'server/db/client'

export const roomMiddleware: ApiHandler = async (req, res, next) => {
  const { roomId: roomCode } = req.query
  const { accountId } = req.session || {}

  if (typeof roomCode !== 'string') {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid Room ID format' })
  }

  const room = await prisma.room.findUnique({ where: { code: roomCode } })
  if (!room) {
    return res
      .status(404)
      .json({ success: false, error: `Room ${roomCode} do not found` })
  }

  req.info = { room }

  const isPublicMethod = req.method === 'GET'
  if (isPublicMethod) {
    return next()
  }

  const owner = room.members.find((member) => member.role === 'owner')
  const isRoomOwner = owner?.accountId === accountId

  if (!isRoomOwner) {
    return res
      .status(401)
      .json({ success: false, error: 'You are not the owner of this room' })
  }

  return next()
}
