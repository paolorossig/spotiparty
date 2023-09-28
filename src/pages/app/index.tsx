import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'

import Rooms from '@/components/app/Rooms'
import AppLayout from '@/components/layout/app'
import Alert from '@/components/shared/Alert'
import { api } from '@/lib/api'

const App = () => {
  const { data: session } = useSession()
  const created = api.rooms.getCreated.useQuery()
  const joined = api.rooms.getJoined.useQuery()

  const allowRoomCreation = session?.provider === 'spotify'

  return (
    <AppLayout>
      <h1 className="my-10 text-center text-5xl font-bold">
        Welcome to{' '}
        <span className="text-green-500 hover:animate-pulse">Spotiparty!</span>
      </h1>
      {allowRoomCreation ? (
        <Rooms
          title="My rooms"
          data={created.data}
          isLoading={created.isLoading}
          showCreationCard={true}
        />
      ) : (
        <Alert
          icon={InformationCircleIcon}
          title="Note"
          description="To create rooms you must login with your Spotify account"
          className="mb-6"
        />
      )}
      <Rooms
        title="Joined rooms"
        data={joined.data}
        isLoading={joined.isLoading}
        showCreationCard={false}
      />
    </AppLayout>
  )
}

export default App
