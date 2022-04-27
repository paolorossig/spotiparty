import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// @ts-ignore
export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  if (token || pathname.includes('/api/auth')) {
    return NextResponse.next()
  }

  // Avoid bucles of redirects
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('login', req.url))
  }
}
