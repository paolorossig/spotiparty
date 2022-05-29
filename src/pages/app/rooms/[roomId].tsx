import clsx from 'clsx'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
import Button from 'lib/ui/components/Button'
import Toaster from 'lib/ui/components/Toaster'
import AppLayout from 'lib/ui/layouts/AppLayout'
import Tracks from 'lib/rooms/components/Tracks'
import Members from 'lib/rooms/components/Members'
import ShareRoom from 'lib/rooms/components/ShareRoom'
import {
  useGeneratePlaylistMutation,
  useGetRoombyIdQuery,
} from 'lib/rooms/services/roomApi'

const TABS = {
  Members: 'Members',
  Playlist: 'Playlist',
}

const Room = () => {
  const router = useRouter()
  const { roomId } = router.query

  const [generatePlaylist] = useGeneratePlaylistMutation()
  const { data, error, isLoading } = useGetRoombyIdQuery(
    (roomId as string) || ''
    // { pollingInterval: 3000 }
  )

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const setObj = new Set()

    const uniqueTrackUris = data?.tracks?.reduce<string[]>((acc, track) => {
      if (!setObj.has(track.id)) {
        setObj.add(track.id)
        acc.push(track.uri)
      }
      return acc
    }, [])

    try {
      const response = await generatePlaylist({
        roomId: roomId,
        roomName: data?.name,
        tracks: uniqueTrackUris,
      }).unwrap()
      console.log(response)
      toast.success('Playlist generated')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <AppLayout error={error?.message} isLoading={isLoading}>
      {!data ? (
        <div className="grid flex-1 place-content-center">
          <p>Something went wrong. Please try again later.</p>
        </div>
      ) : (
        <>
          <ShareRoom room={data} />
          <br />
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="mb-2 text-4xl font-bold">{data.name} Room</h1>
              <p className="text-xl text-gray-300">{data.description}</p>
            </div>
            <div>
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-gray-700/30 p-1">
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
                    <Members room={data} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Tracks room={data} />
                    <div className="mx-auto grid max-w-xs">
                      <Button onClick={handleClick}>Create Playlist</Button>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </section>
          <Toaster />
        </>
      )}
    </AppLayout>
  )
}

export default Room
