import { MongooseError } from 'mongoose'

export interface Room {
  _id: string
  name: string
  description: string
  owner: string
  accountId: string
  qrCodeImageUrl?: string
  members: string[]
  createdAt: string
  updatedAt: string
}

export interface inputsRoomCreation {
  name: string
  description: string
}

export interface getRoomsResponse {
  success: boolean
  data?: Room[]
}

export interface createRoomResponse {
  success: boolean
  data?: Room
  error?: MongooseError
}
