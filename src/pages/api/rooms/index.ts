import type { NextApiHandler } from 'next'
import { getSession } from 'next-auth/react'
import dbConnect from '../../../lib/mongoose'
import Room from '../../../models/Room'

const roomsHandler: NextApiHandler = async (req, res) => {
  await dbConnect()

  const { method } = req
  const session = await getSession({ req })

  if (!session) return res.status(401).json({ success: false })
  const { name: owner, accountId } = session.user

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
        const { name } = req.body
        const room = await Room.create({
          name,
          owner,
          accountId,
          members: [accountId],
        })
        return res.status(201).json({ success: true, data: room })
      } catch (error) {
        return res.status(400).json({ success: false, error })
      }

    default:
      return res.status(400).json({ success: false })
  }
}

export default roomsHandler
