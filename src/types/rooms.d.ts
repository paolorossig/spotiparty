import { MongooseError } from 'mongoose'

export interface RoomMember {
  accountId: string
  name: string
  image: string
  role: 'owner' | 'member'
}

export interface Room {
  _id: string
  name: string
  description: string
  owner: string
  accountId: string
  linkUrl: string
  qrCodeImageUrl: string
  members: RoomMember[]
  createdAt: string
  updatedAt: string
}

export interface inputsRoomCreation {
  name: string
  description: string
}

export interface getSingleRoomResponse {
  success: boolean
  data?: Room
  error?: string
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
