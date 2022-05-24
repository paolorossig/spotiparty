import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const rootFolder = process.env.CLOUDINARY_ROOT_FOLDER

const storage = (folder: string) =>
  new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder:
          process.env.NODE_ENV === 'production'
            ? `${rootFolder}/${folder}`
            : `${rootFolder}/dev-${folder}`,
        resource_type: 'auto',
        public_id: `${file.originalname.split('.')[0]}_${Date.now()}`,
        transformation: [
          {
            width: 500,
            height: 500,
            crop: 'limit',
          },
        ],
      }
    },
  })

export const parser = (folder: string) => multer({ storage: storage(folder) })
