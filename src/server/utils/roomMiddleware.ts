import type { ApiHandler } from 'types/utils'
import { prisma } from 'server/db/client'

export const roomMiddleware: ApiHandler = async (req, res, next) => {
  const isPublicMethod = req.method === 'GET'
  if (isPublicMethod) {
    return next()
  }

  const { roomId } = req.query
  const { accountId } = req.session

  if (typeof roomId !== 'string') {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid Room ID format' })
  }

  const room = await prisma.room.findUnique({ where: { id: roomId } })
  if (!room) {
    return res
      .status(404)
      .json({ success: false, error: `Room ${roomId} do not found` })
  }

  const owner = room.members.find((member) => member.role === 'owner')
  const isRoomOwner = owner?.accountId === accountId

  if (!isRoomOwner) {
    return res
      .status(401)
      .json({ success: false, error: 'You are not the owner of this room' })
  }

  req.info = { room }

  return next()
}
