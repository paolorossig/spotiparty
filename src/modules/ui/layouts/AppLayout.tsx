import Head from 'next/head'
import { useSession } from 'next-auth/react'
import AppHeader from '../components/navigation/AppHeader'
import Spinner from '../components/Spinner'
import Toaster from '../components/Toaster'

interface Props {
  children?: React.ReactNode
  isLoading?: boolean
}

const AppLayout = ({ children, isLoading }: Props) => {
  const { data: session, status } = useSession()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty | App</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      {status === 'loading' || isLoading ? (
        <Spinner />
      ) : !session ? (
        <p className="text-3xl font-bold">No session</p>
      ) : (
        <>
          <AppHeader />
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
