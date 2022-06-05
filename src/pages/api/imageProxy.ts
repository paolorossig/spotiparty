import { withImageProxy } from 'lib/server/utils/next-image-proxy'

export default withImageProxy({
  whitelistedPatterns: [/^https?::\/\/(.*).fbcdn.net/],
})
