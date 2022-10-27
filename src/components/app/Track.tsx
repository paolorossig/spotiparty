import Image from 'next/image'
import { PlayIcon } from '@heroicons/react/24/solid'

type Track = {
  id: string
  uri: string
  name: string
  artists: string
  albumImageUrl: string
  durationMs: number
  explicit: boolean
}

const getDuration = (durationMs: number) => {
  const minutes = Math.floor(durationMs / 1000 / 60)
  const seconds = Math.floor((durationMs / 1000) % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const Track = ({ track }: { track: Track }) => {
  return (
    <li className="group flex items-center justify-between rounded-md p-2 hover:cursor-pointer hover:bg-gray-800">
      <div className="flex space-x-4">
        <div className="relative h-[50px] w-[50px]">
          <Image
            src={track.albumImageUrl}
            height={50}
            width={50}
            alt={`ALbum Image of ${track.name}`}
            className="group-hover:opacity-50"
          />
          <i className="hidden group-hover:flex">
            <PlayIcon className="absolute inset-0 m-auto h-6 w-6 text-white" />
          </i>
        </div>
        <div className="flex flex-col space-y-1">
          <h2>{track.name}</h2>
          <div className="flex items-center space-x-2">
            {track.explicit && (
              <span className="grid h-4 w-4 place-content-center rounded-sm bg-gray-500 text-[10px]">
                E
              </span>
            )}
            <span className="text-sm text-gray-400">{track.artists}</span>
          </div>
        </div>
      </div>
      <div className="pl-4">
        <span className="mr-2 text-gray-400">
          {getDuration(track.durationMs)}
        </span>
      </div>
    </li>
  )
}

export default Track
