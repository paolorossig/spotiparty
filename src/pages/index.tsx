import Image from 'next/image'

import LandingLayout from '@/components/layout/home'

const Home = () => {
  return (
    <LandingLayout>
      <section className="bg-circle-gradient flex w-full flex-col items-center px-4 py-8 md:flex-row lg:py-16">
        <div className="text-center md:w-2/5 md:text-left">
          <h1 className="text-5xl font-bold">Best app for Karaoke</h1>
          <h2 className="my-4 text-lg text-gray-300 lg:text-xl">
            Spotiparty creates a unique playlist based on your last songs played
          </h2>
        </div>
        <div className="flex justify-center md:w-3/5">
          <Image
            src="/static/illustrations/undraw_mello.svg"
            alt="Undraw Mello"
            priority
            width={500}
            height={431}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
            }}
          />
        </div>
      </section>
    </LandingLayout>
  )
}

export default Home
