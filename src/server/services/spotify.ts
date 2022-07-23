import type { Playlist, Track } from 'types/rooms'
import spotifyApi from 'lib/spotify'
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

export const createPlaylist = async (
  name: string,
  session: any
): Promise<Playlist> => {
  spotifyApi.setAccessToken(session.accessToken)

  try {
    const { body } = await spotifyApi.createPlaylist(name, {
      description: 'Created with <3 by Spotiparty',
      collaborative: false,
      public: true,
    })
    const { id, external_urls, uri } = body
    return { id, spotifyUrl: external_urls.spotify, uri }
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message)
  }
}

export const updatePlaylistItems = async (
  playlistId: string,
  tracks: string[],
  session: any
) => {
  spotifyApi.setAccessToken(session.accessToken)

  try {
    const response = await spotifyApi.addTracksToPlaylist(playlistId, tracks)
    return response
  } catch (error: any) {
    console.error(error)
    throw new Error(error.message)
  }
}
