import { type Session } from 'next-auth'

export type MemberInfo = Omit<Session['user'], 'id'>

export type MemberPayload = { id: string; info: MemberInfo }

export type ChannelMembers = {
  count: number
  me: MemberPayload
  myID: string
  members: Record<string, MemberInfo>
}
