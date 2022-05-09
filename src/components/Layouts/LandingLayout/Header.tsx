import Link from 'next/link'
import Image from 'next/image'

const NavLinks = ({ className }: { className: string }) => {
  return (
    <div className={className}>
      <Link href="/docs">
        <a>Docs</a>
      </Link>
      <Link href="/pricing">
        <a>Pricing</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </div>
  )
}

const Header = () => {
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
          <Link href="/login">
            <a className="rounded-xl border-2 border-gray-700 py-2 px-4">
              Login
            </a>
          </Link>
        </div>
        <NavLinks className="flex h-10 items-center gap-16 md:hidden" />
      </nav>
    </header>
  )
}

export default Header
