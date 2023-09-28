import Image from 'next/image'
import Link from 'next/link'
import { FolderPlusIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

import Spinner from '@/components/shared/Spinner'

type RoomCardInfo = { name: string; roomId: string; imageUrl: string }

const CreateRoomCard = () => {
  return (
    <Link
      href="app/rooms/create"
      className="ring-on-focus rounded-xl focus:ring-offset-4"
    >
      <article className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-white hover:bg-white/10">
        <p className="mb-2">Create a new room...</p>
        <div className="rounded-full bg-white p-2">
          <FolderPlusIcon className="h-5 w-5 text-gray-900" />
        </div>
      </article>
    </Link>
  )
}

const RoomCard = ({ room }: { room: RoomCardInfo }) => {
  return (
    <Link
      href={`/app/rooms/${room.roomId}`}
      className="ring-on-focus rounded-xl focus:ring-offset-4"
    >
      <article className="group flex h-44 flex-row items-center justify-center gap-4 rounded-xl border border-white hover:bg-white/10">
        <figure
          className={clsx(
            'relative h-20 w-20 overflow-hidden rounded-full brightness-50 grayscale filter transition duration-300',
            'group-hover:brightness-100 group-hover:grayscale-0',
          )}
        >
          <Image
            src={room.imageUrl}
            alt="Room image"
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </figure>
        <p className="text-xl font-bold">{room.name}</p>
      </article>
    </Link>
  )
}

const Rooms = ({
  title,
  data,
  isLoading,
  showCreationCard = false,
}: {
  title: string
  data?: RoomCardInfo[]
  isLoading: boolean
  showCreationCard: boolean
}) => {
  // TODO: Add skeleton loading
  if (isLoading) return <Spinner variant="light" size="large" />

  const showEmptyState = !data?.length && !showCreationCard

  return (
    <section className="p-2">
      <h2 className="mb-4 text-xl font-bold text-gray-300">{title}</h2>
      <div
        className={clsx(
          'grid min-h-[11rem] gap-6',
          showEmptyState
            ? 'grid-cols-1 place-content-center'
            : 'md:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {data?.map((room) => <RoomCard key={room.roomId} room={room} />)}

        {showCreationCard && <CreateRoomCard />}

        {showEmptyState && (
          <p className="text-center text-white">No rooms found</p>
        )}
      </div>
    </section>
  )
}

export default Rooms
