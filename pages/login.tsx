import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'

const Login = ({ providers }: { providers: ClientSafeProvider[] }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty - Login</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a
            className="text-green-500 hover:animate-pulse"
            href="https://github.com/paolorossig/spotiparty"
          >
            Spotiparty!
          </a>
        </h1>
        <p className="mt-3 text-2xl">
          Get started by login with your Spotify account
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.id} className="mt-6">
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
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

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
