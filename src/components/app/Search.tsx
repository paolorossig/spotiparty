import { useEffect, useState } from 'react'
import {
  useClientTrigger,
  useEvent,
  usePresenceChannel,
} from '@harelpls/use-pusher'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

import { api, RouterOutputs } from '@/lib/api'
import useDebounce from '@/lib/hooks/useDebounce'
import { type ChannelMembersMe } from '@/lib/pusher'
import { RoomEvents } from '@/server/constants/events'

import Track from './Track'

type Tracks = NonNullable<RouterOutputs['music']['searchTracks']>

const Search = ({
  channelName,
  isRoomOwner,
  onTrackSelection,
}: {
  channelName: string
  isRoomOwner: boolean
  onTrackSelection: (trackUri: string) => void
}) => {
  const { channel } = usePresenceChannel(channelName)
  const trigger = useClientTrigger(channel)

  const [displayTracks, setDisplayTracks] = useState<Tracks>([])
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const [requestedSearch, setRequestedSearch] = useState({ query: '', to: '' })

  const { data: session } = useSession()
  const isLocalSearch = session?.provider === 'spotify'
  const enableLocalSearch = isLocalSearch && !!debouncedSearch

  useEffect(() => {
    if (!debouncedSearch) return

    if (!isLocalSearch) {
      toast.success('Search request sent to the owner!')
      trigger(RoomEvents.ClientRequestSearchTracks, debouncedSearch)
    }
  }, [debouncedSearch, isLocalSearch, trigger])

  // Local Search
  const { data: localTracks } = api.music.searchTracks.useQuery(
    { query: debouncedSearch },
    { enabled: enableLocalSearch },
  )

  useEffect(() => {
    if (!localTracks?.length) return

    setDisplayTracks(localTracks)
  }, [localTracks])

  // Member requested search
  useEvent<string>(
    channel,
    RoomEvents.ClientRequestSearchTracks,
    (data, metadata) => {
      if (isRoomOwner && data && metadata) {
        setRequestedSearch({ query: data, to: metadata.user_id })
      }
    },
  )

  const { data: requestedTracks } = api.music.searchTracks.useQuery(
    { query: requestedSearch.query },
    { enabled: !!requestedSearch.query },
  )

  useEffect(() => {
    if (!requestedTracks?.length) return

    trigger(RoomEvents.ClientSendSearchResults, {
      tracks: requestedTracks,
      to: requestedSearch.to,
    })
  }, [requestedSearch.to, requestedTracks, trigger])

  useEvent<{ tracks: Tracks; to: string }>(
    channel,
    RoomEvents.ClientSendSearchResults,
    (data) => {
      if (data && data.to === (channel?.members.me as ChannelMembersMe)?.id) {
        setDisplayTracks(data.tracks)
      }
    },
  )

  const cleanSearchInput = () => {
    setSearch('')
    setDisplayTracks([])
  }

  return (
    <>
      <div className="relative">
        <i className="absolute inset-y-0 z-10 flex items-center pl-2">
          <MagnifyingGlassIcon className="h-7 w-7 text-gray-700" />
        </i>
        <input
          type="text"
          placeholder="Search any song"
          className="pl-10 text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <i
            className="absolute inset-y-0 right-0 z-10 flex items-center px-2 hover:cursor-pointer"
            onClick={cleanSearchInput}
          >
            <XMarkIcon className="h-7 w-7 text-gray-700" />
          </i>
        )}
      </div>
      <ul className="my-6 flex flex-col gap-4">
        {displayTracks?.map((track) => (
          <Track
            key={track.id}
            track={track}
            onClick={() => onTrackSelection(track.uri)}
          />
        ))}
      </ul>
    </>
  )
}

export default Search
