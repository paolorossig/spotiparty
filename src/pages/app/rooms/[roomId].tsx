import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ArrowPathIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

import EditRoomDialog from '@/components/app/EditRoomDialog'
import Members from '@/components/app/Members'
import MusicPlayer from '@/components/app/MusicPlayer'
import Search from '@/components/app/Search'
import ShareRoom from '@/components/app/ShareRoom'
import AppLayout from '@/components/layout/app'
import ErrorLayout from '@/components/layout/ErrorLayout'
import Button from '@/components/shared/Button'
import IconButton from '@/components/shared/IconButton'
import Tooltip from '@/components/shared/Tooltip'
import { api } from '@/lib/api'
import useToggle from '@/lib/hooks/useToggle'
import { pusherClient } from '@/lib/pusher'
import usePlaybackStore from '@/lib/stores/playbackStore'
import { PusherEvents, RoomEvents } from '@/server/constants/events'
import type { ChannelMembers, MemberPayload } from '@/types/pusher'

const Room = () => {
  const router = useRouter()
  const roomId = router.query.roomId as string
  const [isModalOpen, toggleModal] = useToggle()

  const { data, error, isLoading, refetch } = api.rooms.getByRoomId.useQuery(
    {
      roomId,
    },
    {
      enabled: !!roomId,
      retry: 1,
      onError: (err) => {
        if (err.data?.code === 'UNAUTHORIZED') {
          api.rooms.accessByRoomId.useMutation().mutate({ roomId })
        }
      },
    },
  )

  const { data: members } = api.rooms.getMembers.useQuery(
    { roomId },
    { enabled: !!roomId && !!data },
  )

  const changePlaybackMutation = api.rooms.changePlaybackState.useMutation()

  // Playback

  const { cleanPlayback, setPlayback } = usePlaybackStore()

  useEffect(() => {
    return () => {
      cleanPlayback()
    }
  }, [cleanPlayback])

  // Room Channel

  const roomChannelName = `presence-room-${roomId}`
  const [connectedMembers, setConnectedMembers] = useState<string[]>([])

  useEffect(() => {
    const channel = pusherClient.subscribe(roomChannelName)

    // Presence channel bindings
    channel.bind(
      PusherEvents.SubscriptionSucceeded,
      (members: ChannelMembers) => {
        setConnectedMembers(Object.keys(members.members))
      },
    )
    channel.bind(PusherEvents.MemberAdded, (member: MemberPayload) => {
      setConnectedMembers((prev) => [...prev, member.id])
    })
    channel.bind(PusherEvents.MemberRemoved, (member: MemberPayload) => {
      setConnectedMembers((prev) => prev.filter((id) => id !== member.id))
    })

    // Room bindings
    channel.bind(
      RoomEvents.ChangePlayback,
      ({ trackUri }: { trackUri: string }) => {
        setPlayback(trackUri)
      },
    )

    return () => {
      pusherClient.unsubscribe(roomChannelName)
    }
  }, [roomChannelName, setPlayback])

  if (isLoading) {
    return <AppLayout isLoading={isLoading} />
  }

  if (!data || error) {
    return <ErrorLayout message={error?.message} />
  }

  const { room, role } = data
  const isRoomOwner = role === 'owner'

  const refetchAndNotify = () => {
    refetch()
    toast.success('Room refreshed')
  }

  const onTrackSelection = (trackUri: string) => {
    if (isRoomOwner) {
      setPlayback(trackUri)
    } else {
      toast.error('Remote Control is now being tested!')

      changePlaybackMutation.mutate({ channel: roomChannelName, trackUri })
    }
  }

  return (
    <AppLayout>
      <EditRoomDialog room={room} isOpen={isModalOpen} toggle={toggleModal} />
      <ShareRoom roomId={room.roomId} />
      <section className="mt-4 flex flex-1 flex-col gap-6">
        <div className="flex items-start">
          <div className="flex-1">
            <div className="mb-2 flex items-center space-x-2 text-4xl font-bold">
              <h1>{room.name} Room</h1>
            </div>
            <p className="text-xl text-gray-300">{room.description}</p>
          </div>
          <div className="flex gap-4 pt-2">
            <Tooltip message="Refresh">
              <IconButton icon={ArrowPathIcon} onClick={refetchAndNotify} />
            </Tooltip>
            <Tooltip message="Edit">
              <IconButton
                icon={PencilSquareIcon}
                onClick={toggleModal}
                disabled={!isRoomOwner}
              />
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          <div className="flex w-full flex-1 flex-col justify-center md:w-2/3">
            <Search onTrackSelection={onTrackSelection} />
            <div className="grid flex-1 place-content-center">
              New features coming soon! 🚀
            </div>
          </div>
          <aside className="w-full space-y-4 md:w-1/3">
            <Members members={members} connectedMembers={connectedMembers} />
            <div className="text-center">
              <Button onClick={() => toast.success('Generated!')}>
                Generate a Playlist
              </Button>
            </div>
          </aside>
          <MusicPlayer />
        </div>
      </section>
    </AppLayout>
  )
}

export default Room
