import Link from 'next/link'
import { useGetUserRoomsQuery } from './roomApi'

const Rooms = () => {
  const { data: userRooms } = useGetUserRoomsQuery('')

  return (
    <>
      {userRooms?.data?.map((room) => (
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
