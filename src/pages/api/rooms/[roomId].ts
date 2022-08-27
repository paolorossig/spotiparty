import type { NextApiResponse } from 'next'
import type { ApiRequestWithSession } from 'types/utils'
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
  .get(async (req: ApiRequestWithSession, res: NextApiResponse) => {
    const { access_token, accountId, name, image } = req.session
    let { room } = req.info

    if (!room.members.find((member) => member.accountId === accountId)) {
      const memberTopTracks = await getUserTopTracks(access_token)

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
  .post(async (req: ApiRequestWithSession, res: NextApiResponse) => {
    const { room } = req.info
    const { roomName, tracks } = req.body
    const { access_token } = req.session

    const playlist = await createPlaylist(roomName, access_token)
    await updatePlaylistItems(playlist.id, tracks, access_token)

    await prisma.room.update({
      where: { id: room.id },
      data: { playlist },
    })

    return res.status(200).json({ success: true, data: playlist })
  })
  .put(async (req: ApiRequestWithSession, res: NextApiResponse) => {
    const { room } = req.info

    const roomUpdated = await prisma.room.update({
      where: { id: room.id },
      data: { ...req.body },
    })

    return res.status(200).json({ success: true, data: roomUpdated })
  })
  .delete(async (req: ApiRequestWithSession, res: NextApiResponse) => {
    const { room } = req.info

    const response = await prisma.room.delete({
      where: { id: room.id },
    })

    return res.status(200).json({ success: true, data: response })
  })

export default handler
