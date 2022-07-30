export interface RoomMember {
  accountId: string
  name: string
  image: string
  role: 'owner' | 'member'
}

export interface Room {
  id: string
  name: string
  description: string
  owner: string
  accountId: string
  linkUrl: string
  imageUrl: string
  members: RoomMember[]
  tracks: Track[]
  playlist: Playlist
  createdAt: string
  updatedAt: string
}

export interface Track {
  id: string
  uri: string
  title: string
  artist: string
  popularity: number
  albumImageUrl: string
}

export interface Playlist {
  id: string
  spotifyUrl: string
  uri: string
}
