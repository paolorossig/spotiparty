import spotifyApi from 'lib/spotify'
import { TOP_TRACKS_LIMIT } from '../constants'

export const refreshSpotifyTokens = async (refreshToken: string) => {
  try {
    spotifyApi.setRefreshToken(refreshToken)
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return refreshedToken
  } catch (error) {
    handleSpotityError(error)
  }
}

export const getUserTopTracks = async (accessToken: string) => {
  spotifyApi.setAccessToken(accessToken)

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
  } catch (error) {
    handleSpotityError(error)

    return []
  }
}

export const createPlaylist = async (name: string, accessToken: string) => {
  spotifyApi.setAccessToken(accessToken)

  try {
    const { body } = await spotifyApi.createPlaylist(name, {
      description: 'Created with <3 by Spotiparty',
      collaborative: false,
      public: true,
    })
    const { id, external_urls, uri } = body
    return { id, spotifyUrl: external_urls.spotify, uri }
  } catch (error) {
    handleSpotityError(error)
  }
}

export const updatePlaylistItems = async (
  playlistId: string,
  tracks: string[],
  accessToken: string
) => {
  spotifyApi.setAccessToken(accessToken)

  try {
    const response = await spotifyApi.addTracksToPlaylist(playlistId, tracks)
    return response
  } catch (error) {
    handleSpotityError(error)
  }
}

export const playTracks = async (tracks: string[], accessToken: string) => {
  spotifyApi.setAccessToken(accessToken)

  try {
    await spotifyApi.play({ uris: tracks })
  } catch (error) {
    handleSpotityError(error)
  }
}

// Error Handling

type SpotifyWebApiError = { message: string; statusCode: number }

const isSpotifyWebApiError = (error: unknown): error is SpotifyWebApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'statusCode' in error &&
    typeof (error as Record<string, unknown>).message === 'string' &&
    typeof (error as Record<string, unknown>).statusCode === 'number'
  )
}

const handleSpotityError = (error: unknown) => {
  let status = null
  let message = 'Unknown error'

  if (isSpotifyWebApiError(error)) {
    message = error.message
    status = error.statusCode
  }

  console.error('Spotify API Error:', { status, message })
}
