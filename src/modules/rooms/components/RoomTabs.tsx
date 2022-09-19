import type { Room } from '@prisma/client'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { Tab } from '@headlessui/react'
import Button from 'modules/ui/components/Button'
import Members from './Members'
import Tracks from './Tracks'
import { useGeneratePlaylistMutation } from '../services/roomApi'

const TABS = {
  Members: 'Members',
  Playlist: 'Playlist',
}

interface RoomTabsProps {
  room: Room
  isRoomOwner: boolean
}

const RoomTabs = ({ room, isRoomOwner }: RoomTabsProps) => {
  const [generatePlaylist] = useGeneratePlaylistMutation()

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const setObj = new Set()

    const uniqueTrackUris = room.tracks.reduce<string[]>((acc, track) => {
      if (!setObj.has(track.id)) {
        setObj.add(track.id)
        acc.push(track.uri)
      }
      return acc
    }, [])

    try {
      const response = await generatePlaylist({
        roomId: room.id,
        roomName: room.name,
        tracks: uniqueTrackUris,
      }).unwrap()
      console.log(response)
      toast.success('Playlist generated')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-2 rounded-xl bg-gray-700/30 p-1">
        {Object.keys(TABS).map((state) => (
          <Tab
            key={state}
            className={({ selected }) =>
              clsx(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black',
                selected
                  ? 'bg-green-800 text-white shadow'
                  : 'text-gray-300 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            {state}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <Members room={room} />
        </Tab.Panel>
        <Tab.Panel>
          <Tracks room={room} />
          {isRoomOwner && !room.playlist && (
            <div className="mx-auto grid max-w-xs">
              <Button onClick={handleClick}>Create Playlist</Button>
            </div>
          )}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default RoomTabs
