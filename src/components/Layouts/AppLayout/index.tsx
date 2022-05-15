import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Header from './Header'
import Spinner from '@components/Spinner'

interface Props {
  children?: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
  const { data: session, status } = useSession()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty | App</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <Header />
      <main className="flex w-full max-w-5xl flex-1 flex-col p-4">
        {status === 'loading' ? (
          <Spinner />
        ) : !session ? (
          <p className="text-3xl font-bold">No session</p>
        ) : (
          children
        )}
      </main>
    </div>
  )
}

export default AppLayout
