import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a
            className="text-green-500"
            href="https://github.com/paolorossig/spotiparty"
          >
            Spotiparty!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by login with your spotify account
        </p>

        <div className="mt-6">
          <Image
            src="/spotify-icon.png"
            alt="Spotify Logo"
            width={64}
            height={64}
          />
        </div>
      </main>
    </div>
  )
}

export default Home
