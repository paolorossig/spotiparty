import { MicrophoneIcon } from '@heroicons/react/24/outline'
import { User } from '@prisma/client'

import { type RouterOutputs } from '@/lib/api'
import { USER_PLACEHOLDER_IMAGE } from '@/lib/constants'

const MemberItem = ({
  user,
  isConnected,
  isOwner,
}: {
  user: User
  isConnected: boolean
  isOwner: boolean
}) => {
  return (
    <li key={user.id} className="flex items-center space-x-2 px-2">
      <figure className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.image ?? USER_PLACEHOLDER_IMAGE}
          alt="Profile image"
          className="h-8 w-8 rounded-full object-cover"
        />
        {isConnected && (
          <span className="absolute bottom-0 left-6 h-3 w-3 rounded-full border-2 border-gray-800 bg-green-400" />
        )}
      </figure>
      <p>{user.name}</p>
      {isOwner && <MicrophoneIcon className="h-5 w-5 text-yellow-400" />}
    </li>
  )
}

const Members = ({
  members,
  connectedMembers,
}: {
  members: RouterOutputs['rooms']['getMembers'] | undefined
  connectedMembers: string[]
}) => {
  return (
    <div className="box p-4">
      <h2 className="font-medium text-gray-300">Members:</h2>
      <ul className="my-3 flex flex-col gap-2">
        {members
          ?.map((member) => ({
            user: member.user,
            isConnected: connectedMembers.includes(member.user.id),
            isOwner: member.role === 'owner',
          }))
          .sort((a, b) =>
            a.isConnected === b.isConnected ? 0 : a.isConnected ? -1 : 1,
          )
          .map((member) => (
            <MemberItem
              key={member.user.id}
              user={member.user}
              isConnected={member.isConnected}
              isOwner={member.isOwner}
            />
          ))}
      </ul>
    </div>
  )
}

export default Members
