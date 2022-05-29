export interface Track {
  id: string
  uri: string
  title: string
  artist: string
  popularity: number
  albumImageUrl: string
}

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
  tracks: Track[]
  createdAt: string
  updatedAt: string
}

export interface Playlist {
  id: string
  spotifyUrl: string
  uri: string
}
