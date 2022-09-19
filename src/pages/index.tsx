import type { NextPage } from 'next'
import Image from 'next/image'
import LandingLayout from 'modules/ui/layouts/LandingLayout'

const Home: NextPage = () => {
  return (
    <LandingLayout>
      <section className="bg-circle-gradient flex w-full flex-col items-center px-4 py-8 md:flex-row lg:py-16">
        <div className="w-full text-center md:w-2/5 md:text-left">
          <h1 className="text-5xl font-bold">Best app for Karaoke</h1>
          <br />
          <h2 className="text-lg text-gray-300 lg:text-xl">
            Spotiparty creates a unique playlist based on your last songs played
          </h2>
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
    </LandingLayout>
  )
}

export default Home
