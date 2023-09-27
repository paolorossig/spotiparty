import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
  ArrowLeftOnRectangleIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { signOut, useSession } from 'next-auth/react'

import { USER_PLACEHOLDER_IMAGE } from '@/lib/constants'
import { ACCOUNT_URL } from '@/lib/spotify'

const ProfileMenu = () => {
  const { data: session } = useSession()
  const { name, image } = session?.user || {}

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        className={clsx(
          'ring-on-focus flex items-center space-x-2 rounded-full bg-gray-700 p-2 pr-4 shadow-lg shadow-gray-900/60',
          'hover:bg-gray-800',
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image || USER_PLACEHOLDER_IMAGE}
          alt="Profile image"
          className="h-10 w-10 rounded-full object-cover"
        />
        <span>{name}</span>
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
                  href={ACCOUNT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    active && 'bg-green-500',
                    'group flex w-full items-center gap-2 rounded-md p-2',
                  )}
                >
                  <ArrowUpRightIcon className="h-4 w-4" />
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
                    'group flex w-full items-center gap-2 rounded-md p-2',
                  )}
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
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
