import type { NextPage } from 'next'
import Link from 'next/link'
import { RiFolderAddLine } from 'react-icons/ri'
import AppLayout from '../../components/Layouts/AppLayout'

const App: NextPage = () => {
  return (
    <AppLayout>
      <h1 className="my-10 text-center text-5xl font-bold">
        Welcome to{' '}
        <a
          className="text-green-500 hover:animate-pulse"
          href="https://github.com/paolorossig/spotiparty"
        >
          Spotiparty!
        </a>
      </h1>
      <section className="flex w-full gap-4 p-2">
        <Link href="app/rooms/create">
          <a>
            <article className="flex h-44 w-60 cursor-pointer flex-col items-center justify-center rounded-lg border border-white hover:bg-white/10">
              <p className="mb-2">Create a new room...</p>
              <RiFolderAddLine className="rounded-full bg-white p-2 text-4xl text-gray-900" />
            </article>
          </a>
        </Link>
      </section>
    </AppLayout>
  )
}

export default App
