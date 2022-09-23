import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { trpc } from 'lib/trpc'

import Spinner from 'modules/ui/components/Spinner'

const Rooms = () => {
  const { data, isLoading } = trpc.useQuery(['rooms.getAll'])

  if (!data) return null
  if (isLoading) return <Spinner variant="light" size="large" />

  return (
    <>
      {data.map((room) => (
        <Link href={`/app/rooms/${room.code}`} key={room.code}>
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
    </>
  )
}

export default Rooms
