import { MicrophoneIcon } from '@heroicons/react/24/outline'

import { api } from '@/lib/api'
import { USER_PLACEHOLDER_IMAGE } from '@/lib/constants'

const Members = ({ roomId }: { roomId: string }) => {
  const { data: members } = api.rooms.getMembers.useQuery({ roomId })

  return (
    <div className="box p-4">
      <h2 className="font-medium text-gray-300">Members:</h2>
      <ul className="my-3 flex flex-col gap-2">
        {members?.map((member) => (
          <li key={member.user.id} className="ml-4 flex items-center space-x-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.user.image || USER_PLACEHOLDER_IMAGE}
              alt="Profile image"
              className="h-8 w-8 rounded-full object-cover"
            />
            <p>{member.user.name}</p>
            {member.role === 'owner' && (
              <MicrophoneIcon className="h-5 w-5 text-yellow-400" />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Members
