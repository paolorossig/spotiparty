import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }: { providers: ClientSafeProvider[] }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty | Login</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-12 text-center">
        <h1 className="text-5xl font-bold lg:text-6xl">
          Welcome to{' '}
          <Link href="/">
            <a className="text-green-500 hover:animate-pulse">Spotiparty!</a>
          </Link>
        </h1>
        <h3 className="my-4 text-lg text-gray-300 lg:text-2xl">
          Get started by login with your Spotify account
        </h3>
        {Object.values(providers).map((provider) => (
          <div key={provider.id} className="mt-4">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/app' })}
              className="flex items-center space-x-4 rounded-full bg-gray-700 p-2 hover:bg-gray-500"
            >
              <Image
                src="/spotify-icon.png"
                alt="Spotify Logo"
                width={40}
                height={40}
              />
              <p className="pr-2">Login with {provider.name}</p>
            </button>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
