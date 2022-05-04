import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'

const App: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>No session</p>

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty | App</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-12 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a
            className="text-green-500"
            href="https://github.com/paolorossig/spotiparty"
          >
            Spotiparty!
          </a>
        </h1>
        <div className="my-4 flex flex-col items-center gap-4 lg:flex-row">
          <p>Signed in as</p>
          <div className="flex items-center space-x-2">
            <Image
              src={
                session.user.image ||
                'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
              }
              alt="Profile image"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <p>{session.user.name}</p>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="rounded-full bg-gray-700 px-4 py-2 text-white hover:bg-gray-500"
        >
          Log out
        </button>
      </main>
    </div>
  )
}

export default App
