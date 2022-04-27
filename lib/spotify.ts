import SpotifyWebApi from 'spotify-web-api-node'

const params = {
  scopes: [
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-playing',
    'user-follow-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
  ].join(','),
}

const queryParamString = new URLSearchParams(params)

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

export default spotifyApi
