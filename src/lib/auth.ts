import type { JWT } from 'next-auth/jwt'
import spotifyApi from './spotify'

export const refreshAccessToken: any = async (token: JWT) => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
    }
  } catch (error) {
    console.error(error)
    return { ...token, error: 'RefreshAccessTokenError' }
  }
}
