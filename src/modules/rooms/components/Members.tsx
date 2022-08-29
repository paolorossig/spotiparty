import type { Room } from '../../../../node_modules/.prisma/client/index'
import { IoMdMicrophone } from 'react-icons/io'
import { USER_PLACEHOLDER_IMAGE } from 'modules/ui/constants/navigation'

const Members = ({ room }: { room: Room }) => {
  return (
    <ul className="my-4 flex flex-col gap-4">
      {room.members?.map((member) => (
        <li key={member.accountId} className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={member.image || USER_PLACEHOLDER_IMAGE}
            alt="Profile image"
            className="h-[60px] w-[60px] rounded-full object-cover"
          />
          <h3>{member.name}</h3>
          {member.role === 'owner' && (
            <IoMdMicrophone className="text-2xl text-yellow-400" />
          )}
        </li>
      ))}
    </ul>
  )
}

export default Members
