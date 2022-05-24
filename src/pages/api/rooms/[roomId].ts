import type { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import dbConnect from 'core/mongoose'
import Room from 'lib/server/models/room'
import { authMiddleware, CustomApiReq, options } from 'lib/server/utils'

const handler = nextConnect(options)
  .use(authMiddleware)
  .get(async (req: CustomApiReq, res: NextApiResponse) => {
    await dbConnect()

    const {
      session: { accountId, name, image },
      query: { roomId },
    } = req

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
  })

export default handler
