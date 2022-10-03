import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { ArrowPathIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { trpc } from 'lib/trpc'

import AppLayout from 'components/layout/app'
import ErrorLayout from 'components/layout/ErrorLayout'
import Tooltip from 'components/shared/Tooltip'
import IconButton from 'components/shared/IconButton'
import useToggle from 'lib/hooks/useToggle'
import ShareRoom from 'components/rooms/ShareRoom'
import EditRoomDialog from 'components/rooms/EditRoomDialog'

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
          <div className="flex gap-4 pt-2">
            <Tooltip message="Refresh">
              <IconButton Icon={ArrowPathIcon} onClick={refetchAndNotify} />
            </Tooltip>
            <Tooltip message="Edit">
              <IconButton
                Icon={PencilSquareIcon}
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
