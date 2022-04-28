import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <Head>
        <title>Spotiparty</title>
        <link rel="icon" href="/icon.png" />
      </Head>

      <Header />

      <main className="flex w-full flex-1 flex-col md:px-20">
        <section className="bg-circle-gradient flex w-full flex-col items-center px-4 py-8 md:flex-row lg:py-16">
          <div className="w-full text-center md:w-2/5 md:text-left">
            <h1 className="text-5xl font-bold">Best app for Karaoke</h1>
            <br />
            <h3 className="text-lg text-gray-400 lg:text-xl">
              Spotiparty creates a unique playlist based on your last songs
              played
            </h3>
            <br />
          </div>
          <div className="flex h-full w-full items-end justify-center md:w-3/5">
            <Image
              src="/undraw_mello.svg"
              alt="Undraw Mello"
              width={500}
              height={500}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
