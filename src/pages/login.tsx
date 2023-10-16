import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { getProviders, signIn, type ClientSafeProvider } from 'next-auth/react'

const ERROR_MESSAGES: Record<string, string> = {
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  default: 'Try signing in with a different account.',
}

const Login = ({ providers }: { providers: ClientSafeProvider[] }) => {
  const searchParams = useSearchParams()

  const error = searchParams.get('error')
  const errorMessage = error
    ? ERROR_MESSAGES[error] || ERROR_MESSAGES.default
    : null

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty | Login</title>
        <link rel="icon" href="/static/icon.png" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-12 text-center">
        <h1 className="text-5xl font-bold lg:text-6xl">
          Welcome to{' '}
          <Link href="/" className="text-green-500 hover:animate-pulse">
            Spotiparty!
          </Link>
        </h1>
        <p className="my-4 text-lg text-gray-300 lg:text-2xl">
          Get started by login with your Spotify account
        </p>
        {errorMessage && (
          <p className="mt-4 rounded-lg bg-red-500 px-4 py-2 font-medium">
            {errorMessage}
          </p>
        )}
        {Object.values(providers).map((provider) => (
          <button
            key={provider.id}
            onClick={() => signIn(provider.id, { callbackUrl: '/app' })}
            className="mt-4 flex items-center space-x-4 rounded-full bg-gray-700 p-2 hover:bg-gray-500"
          >
            <Image
              src={`/static/logos/${provider.id}.png`}
              alt={`${provider.name} Logo`}
              width={40}
              height={40}
            />
            <p className="pr-2">Login with {provider.name}</p>
          </button>
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
