import type { Options } from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'

export const options: Options<NextApiRequest, NextApiResponse> = {
  onError(error, req, res) {
    res.status(501).json({ success: false, error: error.message })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  },
}
