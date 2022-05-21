import clsx from 'clsx'
import { Fragment } from 'react'
import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'
import { RiLogoutBoxLine, RiShareForwardLine } from 'react-icons/ri'

const ProfileMenu = () => {
  const { data: session } = useSession()

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="focus:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-opacity-75">
        <div className="flex items-center space-x-2 rounded-full bg-gray-700 p-2 pr-4 shadow-lg shadow-gray-900/60 hover:bg-gray-800">
          <Image
            src={
              session?.user.image ||
              'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }
            alt="Profile image"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <p>{session?.user.name}</p>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-1 z-10 mt-2 flex flex-col divide-y divide-gray-500 rounded-md bg-gray-700 shadow-lg shadow-gray-900/60 ring-1 ring-black focus:outline-none">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="https://www.spotify.com/account/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    active && 'bg-green-500',
                    'group flex w-full items-center gap-2 rounded-md p-2 text-sm'
                  )}
                >
                  <RiShareForwardLine />
                  Account
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={clsx(
                    active && 'bg-green-500',
                    'group flex w-full items-center gap-2 rounded-md p-2 text-sm'
                  )}
                >
                  <RiLogoutBoxLine />
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileMenu
