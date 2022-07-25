// This is an example of how to read a JSON Web Token from an API route
import type { NextApiHandler } from 'next'
import { getToken } from 'next-auth/jwt'

const handler: NextApiHandler = async (req, res) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req })
  if (token) {
    // Signed in
    console.log('JSON Web Token', JSON.stringify(token, null, 2))
    res.send(200)
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}

export default handler
