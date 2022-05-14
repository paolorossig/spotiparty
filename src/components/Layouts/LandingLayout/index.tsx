import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

interface Props {
  children?: React.ReactNode
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <Header />
      <main className="flex w-full flex-1 flex-col md:px-20">{children}</main>
      <Footer />
    </div>
  )
}

export default LandingLayout
