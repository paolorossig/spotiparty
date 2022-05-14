import type { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import dbConnect from '../../../lib/mongoose'
import Room from '../../../models/Room'

const roomHandler: NextApiHandler = async (req, res) => {
  await dbConnect()

  const {
    method,
    query: { roomId },
  } = req
  const session = await getSession({ req })

  if (!session) return res.status(401).json({ success: false })
  const { accountId, name, image } = session.user

  switch (method) {
    case 'GET':
      try {
        let room = await Room.findOne({ _id: roomId })
        if (!room) {
          return res
            .status(404)
            .json({ success: false, error: `Room ${roomId} do not exist` })
        }

        if (!room.members.find((member) => member.accountId === accountId)) {
          room = await Room.findByIdAndUpdate(
            roomId,
            { $push: { members: { accountId, name, image, role: 'member' } } },
            { new: true }
          )
        }

        return res.status(200).json({ success: true, data: room })
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }

    default:
      return res.status(400).json({ success: false })
  }
}

export default roomHandler
