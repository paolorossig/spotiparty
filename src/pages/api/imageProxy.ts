import { withImageProxy } from 'lib/server/utils/next-image-proxy'

export default withImageProxy({
  whitelistedPatterns: [
    'fbcdn.net',
    'fbsbx.com',
    'i.scdn.co',
    'res.cloudinary.com',
  ],
})
