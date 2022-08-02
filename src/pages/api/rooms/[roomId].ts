import type { NextApiResponse } from 'next'
import type { ApiRequest } from 'types/utils'
import nextConnect from 'next-connect'
import { prisma } from 'server/db/client'
import {
  createPlaylist,
  getUserTopTracks,
  updatePlaylistItems,
} from 'server/services/spotify'
import { authMiddleware, options, roomMiddleware } from 'server/utils'

const handler = nextConnect(options)
  .use(authMiddleware)
  .use(roomMiddleware)
  .get(async (req: ApiRequest, res: NextApiResponse) => {
    const { accountId, name, image } = req.session
    let { room } = req.info

    if (!room.members.find((member) => member.accountId === accountId)) {
      const memberTopTracks = await getUserTopTracks(req.session)

      room = await prisma.room.update({
        where: { id: room.id },
        data: {
          members: [...room.members, { accountId, name, image }],
          tracks: [...room.tracks, ...memberTopTracks],
        },
      })
    }

    return res.status(200).json({ success: true, data: room })
  })
  .post(async (req: ApiRequest, res: NextApiResponse) => {
    const { room } = req.info
    const { roomName, tracks } = req.body

    const playlist = await createPlaylist(roomName, req.session)
    await updatePlaylistItems(playlist.id, tracks, req.session)

    await prisma.room.update({
      where: { id: room.id },
      data: { playlist },
    })

    return res.status(200).json({ success: true, data: playlist })
  })
  .put(async (req: ApiRequest, res: NextApiResponse) => {
    const { room } = req.info

    const roomUpdated = await prisma.room.update({
      where: { id: room.id },
      data: { ...req.body },
    })

    return res.status(200).json({ success: true, data: roomUpdated })
  })
  .delete(async (req: ApiRequest, res: NextApiResponse) => {
    const { room } = req.info

    const response = await prisma.room.delete({
      where: { id: room.id },
    })

    return res.status(200).json({ success: true, data: response })
  })

export default handler
