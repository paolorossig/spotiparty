import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { FiRefreshCw } from 'react-icons/fi'
import { BsGear, BsLink45Deg } from 'react-icons/bs'
import { trpc } from 'lib/trpc'

import AppLayout from 'modules/ui/layouts/AppLayout'
import Tooltip from 'modules/ui/components/Tooltip'
import IconButton from 'modules/ui/components/IconButton'
import useToggle from 'modules/ui/hooks/useToggle'
import RoomTabs from 'modules/rooms/components/RoomTabs'
import ShareRoom from 'modules/rooms/components/ShareRoom'
import EditRoomDialog from 'modules/rooms/components/EditRoomDialog'

const Room = () => {
  const router = useRouter()
  let { roomId } = router.query
  if (!roomId || typeof roomId !== 'string') {
    roomId = ''
  }

  const { data: session } = useSession()
  const [isModalOpen, toggleModal] = useToggle()
  const { data, isLoading, refetch } = trpc.useQuery([
    'rooms.accessByCode',
    { roomCode: roomId },
  ])

  const isRoomOwner = (data?.accountId ?? false) === session?.user.accountId
  const refetchAndNotify = () => {
    refetch()
    toast.success('Room refreshed')
  }

  return (
    <AppLayout isLoading={isLoading}>
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
                <div className="mb-2 flex items-center space-x-2 text-4xl font-bold">
                  <h1>{data.name} Room</h1>
                  {data.playlist && (
                    <Link href={data.playlist.spotifyUrl}>
                      <a>
                        <BsLink45Deg className="cursor-pointer hover:text-green-500" />
                      </a>
                    </Link>
                  )}
                </div>
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
