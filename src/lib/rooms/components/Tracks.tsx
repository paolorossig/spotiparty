import type { Room, Track } from 'types/rooms'
import Image from 'next/image'

const Tracks = ({ room }: { room: Room }) => {
  const setObj = new Set()

  const uniqueTracks = room.tracks?.reduce<Track[]>((acc, track) => {
    if (!setObj.has(track.id)) {
      setObj.add(track.id)
      acc.push(track)
    }
    return acc
  }, [])

  return (
    <div className="my-4 flex flex-col gap-4">
      {uniqueTracks
        ?.sort((a, b) => b.popularity - a.popularity)
        .map((track) => (
          <li key={track.id} className="flex items-center gap-4">
            <Image
              src={track.albumImageUrl}
              alt="Track image"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold">{track.title}</h3>
              <p className="text-sm font-light text-gray-300">{track.artist}</p>
            </div>
          </li>
        ))}
    </div>
  )
}

export default Tracks
