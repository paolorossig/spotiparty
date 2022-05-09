import Link from 'next/link'
import { GoMarkGithub } from 'react-icons/go'

const Footer = () => {
  return (
    <footer className="flex h-14 w-full items-center justify-center border-t border-gray-700">
      <Link href="https://github.com/paolorossig/spotiparty">
        <a target="_blank" rel="noopener noreferrer">
          <GoMarkGithub className="text-3xl" />
        </a>
      </Link>
    </footer>
  )
}

export default Footer
