declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    DATABASE_URL: string
    SPOTIFY_CLIENT_ID: string
    SPOTIFY_CLIENT_SECRET: string
    CLOUDINARY_CLOUD_NAME: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
    CLOUDINARY_ROOT_FOLDER: string
  }
}
