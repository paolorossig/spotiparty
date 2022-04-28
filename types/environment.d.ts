declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    MONGODB_URI: string
    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
  }
}
