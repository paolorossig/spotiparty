import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import Meta from '../Meta'
import Spinner from 'components/shared/Spinner'
import Toaster from 'components/shared/Toaster'
import ProfileMenu from './ProfileMenu'

const AppLayout = ({
  children,
  isLoading,
}: {
  children?: React.ReactNode
  isLoading?: boolean
}) => {
  const { data: session, status } = useSession()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Meta />
      {status === 'loading' || isLoading ? (
        <Spinner />
      ) : !session ? (
        <p className="text-3xl font-bold">No session</p>
      ) : (
        <>
          <header className="flex w-full max-w-5xl items-center justify-between p-4">
            <Link href="/app">
              <a className="flex items-center space-x-2 hover:animate-pulse">
                <Image
                  src="/spotify-icon.png"
                  alt="Spotify Icon"
                  width={28}
                  height={28}
                />
                <p className="text-lg font-bold text-green-500">Spotiparty</p>
              </a>
            </Link>
            <ProfileMenu />
          </header>
          <main className="flex w-full max-w-5xl flex-1 flex-col p-4">
            {children}
          </main>
        </>
      )}
      <Toaster />
    </div>
  )
}

export default AppLayout
