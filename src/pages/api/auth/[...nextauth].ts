import NextAuth from 'next-auth'

import { authOptions } from 'server/services/auth'

export default NextAuth(authOptions)
