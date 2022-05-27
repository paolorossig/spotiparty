import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { parser } from 'core/multer'
import dbConnect from 'core/mongoose'
import { removeImage } from 'core/cloudinary'
import Room from 'lib/server/models/room'
import { getUserTopTracks } from 'lib/server/services/spotify'
import { authMiddleware, options } from 'lib/server/utils'

interface CustomRequest extends NextApiRequest {
  file: any
  session?: any
}

const handler = nextConnect(options)
  .use(authMiddleware)
  .use(parser('rooms').single('image'))
  .get(async (req: CustomRequest, res: NextApiResponse) => {
    await dbConnect()

    const { accountId } = req.session

    try {
      const rooms = await Room.find({ accountId })
      return res.status(200).json({ success: true, data: rooms })
    } catch (error) {
      return res.status(400).json({ success: false, error })
    }
  })
  .post(async (req: CustomRequest, res: NextApiResponse) => {
    await dbConnect()

    const { path, filename } = req.file
    const { name, description } = req.body
    const { name: owner, accountId, image } = req.session

    try {
      let room = await Room.create({
        name,
        owner,
        accountId,
        description,
        members: [{ accountId, name: owner, image, role: 'owner' }],
        imageUrl: path,
      })

      const linkUrl = process.env.NEXTAUTH_URL + `app/rooms/${room._id}`
      const ownerTopTracks = await getUserTopTracks(req.session)

      const roomUpdated = await Room.findByIdAndUpdate(
        room._id,
        {
          linkUrl,
          $push: {
            tracks: { $each: ownerTopTracks },
          },
        },
        { new: true }
      )
      if (roomUpdated) {
        room = roomUpdated
      }

      return res.status(201).json({ success: true, data: room })
    } catch (error: any) {
      if (error.message.split(': ').pop() === "Room's name has to be unique.") {
        await removeImage(filename)
      }
      throw new Error(error.message)
    }
  })

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
