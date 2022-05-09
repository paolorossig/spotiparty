import Link from 'next/link'
import Image from 'next/image'
import ProfileMenu from '../../ProfileMenu'

const Header = () => {
  return (
    <header className="flex w-full justify-center">
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
          <ProfileMenu />
        </div>
      </nav>
    </header>
  )
}

export default Header
