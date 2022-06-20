import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { BsGear } from 'react-icons/bs'
import AppLayout from 'lib/ui/layouts/AppLayout'
import IconButton from 'lib/ui/components/IconButton'
import useToggle from 'lib/ui/hooks/useToggle'
import RoomTabs from 'lib/rooms/components/RoomTabs'
import ShareRoom from 'lib/rooms/components/ShareRoom'
import EditRoomDialog from 'lib/rooms/components/EditRoomDialog'
import { useGetRoombyIdQuery } from 'lib/rooms/services/roomApi'

const Room = () => {
  const router = useRouter()
  let { roomId } = router.query
  if (!roomId || typeof roomId !== 'string') {
    roomId = ''
  }

  const { data: session } = useSession()
  const [isModalOpen, toggleModal] = useToggle()
  const { data, error, isLoading } = useGetRoombyIdQuery(roomId, {
    pollingInterval: 15000,
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
          <EditRoomDialog
            room={data}
            isOpen={isModalOpen}
            toggle={toggleModal}
          />
          <br />
          <section className="flex flex-col gap-6">
            <div className="flex items-start">
              <div className="flex-1">
                <h1 className="mb-2 text-4xl font-bold">{data.name} Room</h1>
                <p className="text-xl text-gray-300">{data.description}</p>
              </div>
              <div className="pt-3">
                <IconButton Icon={BsGear} onClick={toggleModal} />
              </div>
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
