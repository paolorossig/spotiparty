import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import AppLayout from 'lib/ui/layouts/AppLayout'
import RoomTabs from 'lib/rooms/components/RoomTabs'
import ShareRoom from 'lib/rooms/components/ShareRoom'
import { useGetRoombyIdQuery } from 'lib/rooms/services/roomApi'

const Room = () => {
  const router = useRouter()
  let { roomId } = router.query
  if (!roomId || typeof roomId !== 'string') {
    roomId = ''
  }

  const { data: session } = useSession()

  const { data, error, isLoading } = useGetRoombyIdQuery(roomId, {
    pollingInterval: 3000,
  })

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
            <RoomTabs
              room={data}
              isRoomOwner={data.accountId === session?.user.accountId}
            />
          </section>
        </>
      )}
    </AppLayout>
  )
}

export default Room
