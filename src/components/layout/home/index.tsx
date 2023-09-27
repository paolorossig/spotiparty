import Link from 'next/link'

import Github from '@/components/shared/icons/Github'

import Meta from '../Meta'
import Header from './Header'

interface Props {
  children: React.ReactNode
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Meta />
      <Header />
      <main className="flex w-full flex-1">
        <div className="mx-auto flex max-w-5xl flex-1 flex-col">{children}</div>
      </main>
      <footer className="flex h-14 w-full items-center justify-center border-t border-gray-700">
        <Link
          href="https://github.com/paolorossig/spotiparty"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Check out the repository on Github"
        >
          <Github className="h-8 w-8" />
        </Link>
      </footer>
    </div>
  )
}

export default LandingLayout
