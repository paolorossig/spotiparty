import type { NextApiResponse } from 'next'
import dbConnect from 'core/mongoose'
import Room from 'lib/server/models/room'
import authMiddleware, { CustomApiReq } from 'lib/server/utils/authMiddleware'

const roomHandler = async (req: CustomApiReq, res: NextApiResponse) => {
  await authMiddleware(req, res)
  await dbConnect()

  const {
    method,
    session,
    query: { roomId },
  } = req

  if (!session) return null // TODO: figure out why this runs even if session is null
  const { accountId, name, image } = session

  switch (method) {
    case 'GET':
      try {
        let room = await Room.findOne({ _id: roomId }).lean()
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
          ).lean()
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
