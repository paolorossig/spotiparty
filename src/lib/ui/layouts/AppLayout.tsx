import Head from 'next/head'
import { useSession } from 'next-auth/react'
import AppHeader from '../components/navigation/AppHeader'
import Spinner from '../components/Spinner'

interface Props {
  children?: React.ReactNode
  error?: string
  isLoading?: boolean
}

const AppLayout = ({ children, error, isLoading }: Props) => {
  const { data: session, status } = useSession()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty | App</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <AppHeader />
      <main className="flex w-full max-w-5xl flex-1 flex-col p-4">
        {status === 'loading' || isLoading ? (
          <Spinner />
        ) : !session ? (
          <p className="text-3xl font-bold">No session</p>
        ) : error ? (
          <p className="text-3xl font-bold">{error}</p>
        ) : (
          children
        )}
      </main>
    </div>
  )
}

export default AppLayout
