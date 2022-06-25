import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FiRefreshCw } from 'react-icons/fi'
import { BsGear, BsLink45Deg } from 'react-icons/bs'
import AppLayout from 'lib/ui/layouts/AppLayout'
import Tooltip from 'lib/ui/components/Tooltip'
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
  const { data, error, isLoading, refetch } = useGetRoombyIdQuery(roomId)

  const isRoomOwner = (data?.accountId ?? false) === session?.user.accountId
  const refetchAndNotify = () => {
    refetch()
    toast.success('Room refreshed')
  }

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
                <h1 className="mb-2 flex items-center space-x-2 text-4xl font-bold">
                  <h1>{data.name} Room</h1>
                  {data.playlist && (
                    <Link href={data.playlist.spotifyUrl}>
                      <BsLink45Deg className="cursor-pointer hover:text-green-500" />
                    </Link>
                  )}
                </h1>
                <p className="text-xl text-gray-300">{data.description}</p>
              </div>
              <div className="flex space-x-2 pt-2">
                <Tooltip message="Refresh">
                  <IconButton
                    Icon={FiRefreshCw}
                    onClick={refetchAndNotify}
                    strokeWidth={1.6}
                  />
                </Tooltip>
                <Tooltip message="Edit">
                  <IconButton
                    Icon={BsGear}
                    onClick={toggleModal}
                    disabled={!isRoomOwner}
                  />
                </Tooltip>
              </div>
            </div>
            <RoomTabs room={data} isRoomOwner={isRoomOwner} />
          </section>
        </>
      )}
    </AppLayout>
  )
}

export default Room
