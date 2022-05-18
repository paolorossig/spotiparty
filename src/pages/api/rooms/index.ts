import type { NextApiResponse } from 'next'
import Room from '@models/room'
import dbConnect from '@lib/mongoose'
import authMiddleware, { CustomApiReq } from '@helpers/api/authMiddleware'

const roomsHandler = async (req: CustomApiReq, res: NextApiResponse) => {
  await authMiddleware(req, res)
  await dbConnect()

  const { method, session } = req
  if (!session) return null // TODO: figure out why this runs even if session is null
  const { name: owner, accountId, image } = session

  switch (method) {
    case 'GET':
      try {
        const rooms = await Room.find({ accountId })
        return res.status(200).json({ success: true, data: rooms })
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }

    case 'POST':
      try {
        const { name, description } = req.body
        let room = await Room.create({
          name,
          owner,
          accountId,
          description,
          members: [{ accountId, name: owner, image, role: 'owner' }],
        })

        const linkUrl = process.env.NEXTAUTH_URL + `app/rooms/${room._id}`
        const roomUpdated = await Room.findByIdAndUpdate(
          room._id,
          { linkUrl },
          { new: true }
        )
        if (roomUpdated) {
          room = roomUpdated
        }

        return res.status(201).json({ success: true, data: room })
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }

    default:
      return res.status(400).json({ success: false })
  }
}

export default roomsHandler
