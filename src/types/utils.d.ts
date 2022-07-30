import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextHandler } from 'next-connect'
import type { Room } from '../../node_modules/.prisma/client/index'

type Info = {
  room: Room
}

export type ApiRequest = NextApiRequest & {
  session?: any
  info: Info
}

export type ApiHandler<T = any> = (
  req: ApiRequest,
  res: NextApiResponse<T>,
  next: NextHandler
) => unknown | Promise<unknown>
