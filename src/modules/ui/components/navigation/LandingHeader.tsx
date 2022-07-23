import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import {
  LANDING_PATHS,
  NAVIGATION_STATES,
} from 'modules/ui/constants/navigation'

const NavLinks = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      {LANDING_PATHS.map((path) => (
        <Link href={path.href} key={path.href}>
          <a>{path.label}</a>
        </Link>
      ))}
    </div>
  )
}

const LandingHeader = () => {
  const { data } = useSession()
  const { authenticated, unauthenticated } = NAVIGATION_STATES
  const button = data?.user ? authenticated : unauthenticated

  return (
    <header className="flex w-full justify-center border-b border-gray-700">
      <nav className="flex w-full max-w-5xl flex-col items-center gap-2 p-4">
        <div className="flex h-10 w-full items-center justify-between">
          <Link href="/">
            <a className="flex items-center space-x-2 hover:animate-pulse">
              <Image
                src="/spotify-icon.png"
                alt="Spotify Icon"
                width={28}
                height={28}
              />
              <p className="text-lg font-bold text-green-500">Spotiparty</p>
            </a>
          </Link>
          <NavLinks className="hidden gap-16 md:flex" />
          <Link href={button.href}>
            <a className="rounded-xl border-2 border-gray-700 py-2 px-4">
              {button.label}
            </a>
          </Link>
        </div>
        <NavLinks className="flex h-10 items-center gap-16 md:hidden" />
      </nav>
    </header>
  )
}

export default LandingHeader
