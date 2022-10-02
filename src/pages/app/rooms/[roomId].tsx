import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { FiRefreshCw } from 'react-icons/fi'
import { BsGear } from 'react-icons/bs'
import { trpc } from 'lib/trpc'

import AppLayout from 'modules/ui/layouts/AppLayout'
import ErrorLayout from 'modules/ui/layouts/ErrorLayout'
import Tooltip from 'modules/ui/components/Tooltip'
import IconButton from 'modules/ui/components/IconButton'
import useToggle from 'modules/ui/hooks/useToggle'
import ShareRoom from 'modules/rooms/components/ShareRoom'
import EditRoomDialog from 'modules/rooms/components/EditRoomDialog'

const Room = () => {
  const router = useRouter()
  const roomId = router.query['roomId'] as string

  const [isModalOpen, toggleModal] = useToggle()
  const { data, error, isLoading, isSuccess, refetch } = trpc.useQuery([
    'rooms.accessByRoomId',
    { roomId },
  ])

  if (isLoading) {
    return <AppLayout isLoading={isLoading} />
  }

  if (!isSuccess || error) {
    return <ErrorLayout title="Room not found" message={error?.message} />
  }

  const { room, role } = data
  const isRoomOwner = role === 'owner'

  const refetchAndNotify = () => {
    refetch()
    toast.success('Room refreshed')
  }

  return (
    <AppLayout>
      <EditRoomDialog room={room} isOpen={isModalOpen} toggle={toggleModal} />
      <ShareRoom room={room} />
      <section className="mt-4 flex flex-1 flex-col gap-6">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="mb-2 flex items-center space-x-2 text-4xl font-bold">
              <h1>{room.name} Room</h1>
            </div>
            <p className="text-xl text-gray-300">{room.description}</p>
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
        <div className="flex flex-1 items-center justify-center">
          <p>New features coming soon! 🚀</p>
        </div>
      </section>
    </AppLayout>
  )
}

export default Room
