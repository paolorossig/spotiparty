import type { Room } from 'types/rooms'
import Image from 'next/image'
import { IoMdMicrophone } from 'react-icons/io'

const Members = ({ room }: { room: Room }) => {
  return (
    <div className="my-4 flex flex-col gap-4">
      {room.members?.map((member) => (
        <li key={member.accountId} className="flex items-center gap-4">
          <Image
            src={
              member.image ||
              'https://res.cloudinary.com/paolorossi/image/upload/v1652998240/spotiparty/user_placeholder_zpoic6.png'
            }
            alt="Profile image"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <h3>{member.name}</h3>
          {member.role === 'owner' && (
            <IoMdMicrophone className="text-2xl text-yellow-400" />
          )}
        </li>
      ))}
    </div>
  )
}

export default Members
