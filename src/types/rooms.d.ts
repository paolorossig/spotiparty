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
  members: RoomMember[]
  imageUrl: string
  createdAt: string
  updatedAt: string
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
