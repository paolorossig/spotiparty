import type { Track } from 'types/rooms'
import spotifyApi from 'core/spotify'
import { TOP_TRACKS_LIMIT } from '../constants'

export const getUserTopTracks = async (session: any): Promise<Track[]> => {
  spotifyApi.setAccessToken(session.accessToken)

  try {
    const response = await spotifyApi.getMyTopTracks({
      limit: TOP_TRACKS_LIMIT,
    })
    const userTopTracks = response.body.items.map((track) => {
      return {
        id: track.id,
        uri: track.uri,
        title: track.name,
        artist: track.artists[0].name,
        popularity: track.popularity,
        albumImageUrl: track.album.images[0].url,
      }
    })

    return userTopTracks
  } catch (error: any) {
    console.error(error)
    return []
  }
}
