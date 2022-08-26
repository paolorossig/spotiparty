import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { parser } from 'lib/multer'
import { removeImage } from 'lib/cloudinary'
import { prisma } from 'server/db/client'
import { getUserTopTracks } from 'server/services/spotify'
import { authMiddleware, options } from 'server/utils'

interface CustomRequest extends NextApiRequest {
  file: any
  session?: any
}

const handler = nextConnect(options)
  .use(authMiddleware)
  .use(parser('rooms').single('image'))
  .get(async (req: CustomRequest, res: NextApiResponse) => {
    const { accountId } = req.session

    try {
      const rooms = await prisma.room.findMany({
        where: { accountId },
      })
      return res.status(200).json({ success: true, data: rooms })
    } catch (error) {
      return res.status(400).json({ success: false, error })
    }
  })
  .post(async (req: CustomRequest, res: NextApiResponse) => {
    if (!req.file) throw new Error('Uploading an Image for room is required')

    const { path, filename } = req.file
    const { name, description } = req.body
    const { name: owner, accountId, image } = req.session

    try {
      let room = await prisma.room.create({
        data: {
          name,
          owner,
          accountId,
          description,
          members: [{ accountId, name: owner, image, role: 'owner' }],
          imageUrl: path,
        },
      })

      const linkUrl = process.env.NEXTAUTH_URL + `app/rooms/${room.id}`
      const ownerTopTracks = await getUserTopTracks(req.session)

      const roomUpdated = await prisma.room.update({
        where: { id: room.id },
        data: {
          linkUrl,
          tracks: ownerTopTracks,
        },
      })

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
