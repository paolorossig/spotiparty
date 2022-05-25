import Image from 'next/image'
import { useRouter } from 'next/router'
import { IoMdMicrophone } from 'react-icons/io'
import { useGetRoombyIdQuery } from 'lib/rooms/services/roomApi'
import Toaster from 'lib/ui/components/Toaster'
import AppLayout from 'lib/ui/layouts/AppLayout'
import ShareRoom from 'lib/rooms/components/ShareRoom'

const Room = () => {
  const router = useRouter()
  const { roomId } = router.query

  const { data, error, isLoading } = useGetRoombyIdQuery(
    (roomId as string) || ''
    // { pollingInterval: 3000 }
  )

  return (
    <AppLayout error={error?.message} isLoading={isLoading}>
      {!data ? (
        <div className="grid flex-1 place-content-center">
          <p>Something went wrong. Please try again later.</p>
        </div>
      ) : (
        <>
          <ShareRoom room={data} />
          <br />
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{data.name} Room</h1>
              <p className="text-xl text-gray-300">{data.description}</p>
            </div>
            <div>
              <p className="text-gray-300">Members:</p>
              <hr className="my-1 border-gray-700" />
              <ul className="m-4 flex flex-col gap-4">
                {data.members?.map((member) => (
                  <li
                    key={member.accountId}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={
                        member.image ||
                        'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                      }
                      alt="Profile image"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <h3>{member.name}</h3>
                    {member.role === 'owner' && (
                      <IoMdMicrophone className="text-2xl text-yellow-400" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <Toaster />
        </>
      )}
    </AppLayout>
  )
}

export default Room
