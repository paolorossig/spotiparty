import type { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { v2 as cloudinary } from 'cloudinary'
import { options } from 'lib/server/utils'

const handler = nextConnect(options).get(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const imgUrl =
      'https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-1/69681099_10206800474567431_3549808393042526208_n.jpg?stp=dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=wA6fRBlTc_sAX8i3glT&_nc_ht=scontent-ort2-2.xx&edm=AP4hL3IEAAAA&oh=00_AT_PPQ0J-qp1KQ6gSPwjhGXNNEld3O6yQfS1iF8MdEMtRQ&oe=62B99440'

    try {
      const image = await cloudinary.uploader.upload(imgUrl, {
        folder: 'spotiparty/users',
      })
      return res.status(200).json({ succes: true, image })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
)

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
