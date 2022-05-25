import type { JWT } from 'next-auth/jwt'
import spotifyApi from 'core/spotify'

export const refreshAccessToken = async (token: JWT): Promise<any> => {
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
