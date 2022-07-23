import type { NextHandler } from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'lib/mongoose'
import Room from 'server/models/room'
import { CustomApiReq } from './authMiddleware'

export const roomMiddleware = async (
  req: CustomApiReq,
  res: NextApiResponse,
  next: NextHandler
) => {
  await dbConnect()

  const { roomId } = req.query
  const { accountId } = req.session

  const isPublicMethod = req.method === 'GET'
  if (isPublicMethod) {
    return next()
  }

  const room = await Room.findOne({ _id: roomId }).lean()
  if (!room) {
    return res.status(404).json({ success: false, error: 'Room not found' })
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
