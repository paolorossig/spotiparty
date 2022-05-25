import Head from 'next/head'
import LandingFooter from '../components/navigation/LandingFooter'
import LandingHeader from '../components/navigation/LandingHeader'

interface Props {
  children?: React.ReactNode
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty</title>
        <link rel="icon" href="/icon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@paolo_rossi_g" />
        <meta name="twitter:creator" content="@paolo_rossi_g" />
        <meta property="og:url" content="https://spotiparty.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Spotiparty | Best app for Karaoke" />
        <meta
          property="og:description"
          content="App that randomly creates playlists for Karaoke based on users recently played songs."
        />
        <meta
          property="og:image"
          content="https://spotiparty.vercel.app/thumbnail.png"
        />
      </Head>

      <LandingHeader />
      <main className="flex w-full flex-1 flex-col md:px-20">{children}</main>
      <LandingFooter />
    </div>
  )
}

export default LandingLayout
