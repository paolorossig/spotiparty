import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { trpc } from 'lib/trpc'
import { RiFolderAddLine } from 'react-icons/ri'

import Spinner from 'modules/ui/components/Spinner'

const CreateRoom = () => {
  return (
    <Link href="app/rooms/create">
      <a>
        <article className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-lg border border-white hover:bg-white/10">
          <p className="mb-2">Create a new room...</p>
          <RiFolderAddLine className="rounded-full bg-white p-2 text-4xl text-gray-900" />
        </article>
      </a>
    </Link>
  )
}

const Rooms = () => {
  const { data, isLoading } = trpc.useQuery(['rooms.getCreated'])

  // TODO: Add skeleton loading
  if (isLoading) return <Spinner variant="light" size="large" />

  if (!data)
    return (
      <section className="grid gap-6 p-2 md:grid-cols-2 lg:grid-cols-3">
        <CreateRoom />
      </section>
    )

  return (
    <section className="grid gap-6 p-2 md:grid-cols-2 lg:grid-cols-3">
      {data.map((room) => (
        <Link href={`/app/rooms/${room.roomId}`} key={room.roomId}>
          <a>
            <article className="group flex h-44 flex-row items-center justify-center gap-4 rounded-xl border border-white hover:bg-white/10">
              <Image
                src={room.imageUrl}
                alt="Room image"
                width={90}
                height={90}
                className={clsx(
                  'rounded-full object-cover brightness-50 grayscale filter transition duration-300',
                  'group-hover:brightness-100 group-hover:grayscale-0'
                )}
              />
              <p className="text-xl font-bold">{room.name}</p>
            </article>
          </a>
        </Link>
      ))}
      <CreateRoom />
    </section>
  )
}

export default Rooms
