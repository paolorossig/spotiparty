import Image from 'next/image'
import LandingLayout from 'components/layout/home'

const Custom404 = () => {
  return (
    <LandingLayout>
      <section className="flex flex-1 flex-col items-center justify-center p-4">
        <h1 className="text-center text-4xl font-bold">404 - Page Not Found</h1>
        <h3 className="text-xl text-gray-300">We are working on it</h3>
        <Image
          src="/undraw_programming.svg"
          alt="Page Not Found Image"
          width={500}
          height={500}
        />
      </section>
    </LandingLayout>
  )
}

export default Custom404
