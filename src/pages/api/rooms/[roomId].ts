import type { NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import Room from 'lib/server/models/room'
import {
  createPlaylist,
  getUserTopTracks,
  updatePlaylistItems,
} from 'lib/server/services/spotify'
import { authMiddleware, CustomApiReq, options } from 'lib/server/utils'
import { roomMiddleware } from 'lib/rooms/utils'

const handler = nextConnect(options)
  .use(authMiddleware)
  .use(roomMiddleware)
  .get(async (req: CustomApiReq, res: NextApiResponse) => {
    const { accountId, name, image } = req.session
    const { roomId } = req.query

    let room = await Room.findOne({ _id: roomId }).lean()
    if (!room) {
      return res
        .status(404)
        .json({ success: false, error: `Room ${roomId} do not exist` })
    }

    if (!room.members.find((member) => member.accountId === accountId)) {
      const memberTopTracks = await getUserTopTracks(req.session)

      room = await Room.findByIdAndUpdate(
        roomId,
        {
          $push: {
            members: { accountId, name, image, role: 'member' },
            tracks: { $each: memberTopTracks },
          },
        },
        { new: true }
      ).lean()
    }

    return res.status(200).json({ success: true, data: room })
  })
  .post(async (req: CustomApiReq, res: NextApiResponse) => {
    const { roomName, tracks } = req.body

    const playlist = await createPlaylist(roomName, req.session)
    await updatePlaylistItems(playlist.id, tracks, req.session)

    return res.status(200).json({ success: true, data: playlist })
  })
  .put(async (req: CustomApiReq, res: NextApiResponse) => {
    const { roomId } = req.query

    const room = await Room.findOneAndUpdate(
      { _id: roomId },
      { ...req.body },
      { new: true, runValidators: true, context: 'query' }
    )

    return res.status(200).json({ success: true, data: room })
  })
  .delete(async (req: CustomApiReq, res: NextApiResponse) => {
    const { roomId } = req.query

    const response = await Room.findByIdAndDelete(roomId)

    return res.status(200).json({ success: true, data: response })
  })

export default handler
