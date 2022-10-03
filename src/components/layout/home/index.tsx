import Meta from '../Meta'
import Link from 'next/link'
import { GoMarkGithub } from 'react-icons/go'

import LandingHeader from './LandingHeader'

interface Props {
  children: React.ReactNode
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Meta />
      <LandingHeader />
      <main className="flex w-full flex-1 flex-col">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
      <footer className="flex h-14 w-full items-center justify-center border-t border-gray-700">
        <Link href="https://github.com/paolorossig/spotiparty">
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Check out the repository on Github"
          >
            <GoMarkGithub className="text-3xl" />
          </a>
        </Link>
      </footer>
    </div>
  )
}

export default LandingLayout
