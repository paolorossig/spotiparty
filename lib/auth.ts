import { JWT } from 'next-auth/jwt'
import spotifyApi from './spotify'

export const refreshAccessToken: any = async (token: JWT) => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    console.log('Refreshed Token is ', refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      accountId: null,
    }
  } catch (error) {
    console.error(error)
    return { ...token, error: 'RefreshAccessTokenError' }
  }
}
