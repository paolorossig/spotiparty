import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextHandler } from 'next-connect'
import type { Session } from 'next-auth'
import type { Room } from '@prisma/client'
import { Session, Session } from 'inspector'

type Info = {
  room: Room
}

export type ApiRequest = NextApiRequest & {
  session?: Session['user'] & { access_token: string }
  file?: Express.Multer.File
  info: Info
}

export type ApiRequestWithSession = Required<ApiRequest>

export type ApiHandler<T = any> = (
  req: ApiRequest,
  res: NextApiResponse<T>,
  next: NextHandler
) => unknown | Promise<unknown>
