import { NextApiHandler } from 'next'

import { pusherServer } from '@/lib/pusher'
import { getServerAuthSession } from '@/server/services/auth'

interface PusherAuthBody {
  socket_id: string
  channel_name: string
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { socket_id: socketId, channel_name: channel } =
        req.body as PusherAuthBody

      const session = await getServerAuthSession({ req, res })
      if (!session) return res.status(401).end()

      const { id: userId, ...userInfo } = session.user

      const presenceData = {
        user_id: userId,
        user_info: userInfo,
      }

      const authResponse = pusherServer.authorizeChannel(
        socketId,
        channel,
        presenceData,
      )

      res.status(200).send(authResponse)
    } catch (error) {
      console.log('Pusher Auth Error:', error)
      res.status(403).end()
    }
  }
}

export default handler
