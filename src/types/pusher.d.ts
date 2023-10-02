import { type Session } from 'next-auth'

export type MemberInfo = Omit<Session['user'], 'id'>

export type ChannelMembers = {
  count: number
  me: { id: string; info: MemberInfo }
  myID: string
  members: Record<string, MemberInfo>
}
