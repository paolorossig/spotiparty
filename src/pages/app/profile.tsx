import AppLayout from 'lib/ui/layouts/AppLayout'
import { useSession } from 'next-auth/react'
// import Image from 'next/image'
import NextImage from 'next/image'

const Profile = () => {
  const { data: session } = useSession()
  const imageUrl = session?.user.image

  if (!imageUrl) return null

  return (
    <AppLayout>
      <div className="grid flex-1 grid-flow-col place-content-center gap-16">
        {/* <Image
          src={imageUrl}
          alt="Profile Image"
          height={300}
          width={300}
          className="rounded-full object-cover"
        /> */}
        <NextImage
          src={`/api/imageProxy?imageUrl=${imageUrl}`}
          width={700}
          height={300}
        />
      </div>
    </AppLayout>
  )
}

export default Profile
