import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'

import Meta from '@/components/layout/Meta'
import Spinner from '@/components/shared/Spinner'
import Toaster from '@/components/shared/Toaster'

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
    <div className="relative flex min-h-screen flex-col justify-center bg-black text-white">
      <Meta />
      {status === 'loading' || isLoading ? (
        <Spinner />
      ) : !session ? (
        <p className="text-center text-3xl font-bold">No session</p>
      ) : (
        <>
          <header className="m-auto flex w-full max-w-5xl items-center justify-between p-4">
            <Link
              href="/app"
              className={clsx(
                'ring-on-focus flex items-center space-x-2 rounded-full px-2 py-3',
                'hover:animate-pulse',
              )}
            >
              <Image
                src="/static/logos/spotify.png"
                alt="Spotify Icon"
                width={28}
                height={28}
              />
              <p className="text-lg font-bold text-green-500">Spotiparty</p>
            </Link>
            <ProfileMenu />
          </header>
          <main className="m-auto mb-14 flex w-full max-w-5xl flex-1 flex-col p-4">
            {children}
          </main>
          <div id="music-player" className="sticky bottom-0 w-full" />
        </>
      )}
      <Toaster />
    </div>
  )
}

export default AppLayout
