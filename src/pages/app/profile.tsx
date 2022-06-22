import AppLayout from 'lib/ui/layouts/AppLayout'
import NextImage from 'next/image'

const Profile = () => {
  const imageUrls = [
    'https://i.scdn.co/image/ab6775700000ee855e6583fca15bb5e9c52a63de',
    'https://scontent-ort2-2.xx.fbcdn.net/v/t1.6435-1/69681099_10206800474567431_3549808393042526208_n.jpg?stp=dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=wA6fRBlTc_sAX8i3glT&_nc_ht=scontent-ort2-2.xx&edm=AP4hL3IEAAAA&oh=00_AT_PPQ0J-qp1KQ6gSPwjhGXNNEld3O6yQfS1iF8MdEMtRQ&oe=62B99440',
    'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1683859985025045&height=300&width=300&ext=1656208520&hash=AeSAOFbduj59jsB8mys',
  ]
  const imgSrc = imageUrls.map((url) => `/api/imageProxy?imageUrl=${url}`)

  return (
    <AppLayout>
      <div className="grid flex-1 grid-flow-col place-content-center gap-16">
        {imgSrc.map((src, index) => (
          <NextImage src={src} key={index} width={300} height={300} />
        ))}
      </div>
    </AppLayout>
  )
}

export default Profile
