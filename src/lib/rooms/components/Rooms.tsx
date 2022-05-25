import Link from 'next/link'
import toast from 'react-hot-toast'
import Spinner from 'lib/ui/components/Spinner'
import { useGetUserRoomsQuery } from 'lib/rooms/services/roomApi'

const Rooms = () => {
  const { data, error, isLoading } = useGetUserRoomsQuery('')

  if (error)
    toast.error(error.message?.split(': ').pop() ?? '', {
      duration: 3000,
    })

  return isLoading ? (
    <Spinner variant="light" size="large" />
  ) : !data ? null : (
    <>
      {data.map((room) => (
        <Link href={`/app/rooms/${room._id}`} key={room._id}>
          <a>
            <article className="flex h-44 flex-col items-center justify-center rounded-xl border border-white hover:bg-white/10">
              <p className="text-xl font-bold">{room.name}</p>
            </article>
          </a>
        </Link>
      ))}
    </>
  )
}

export default Rooms
