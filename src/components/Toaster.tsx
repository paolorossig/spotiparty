import clsx from 'clsx'
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { Toaster as HotToaster, resolveValue } from 'react-hot-toast'
import { MdCheckBox, MdErrorOutline } from 'react-icons/md'

const classes = {
  colors: {
    success: 'border-b-green-600 bg-green-50 text-green-600',
    error: 'border-b-red-600 bg-red-100 text-red-600',
    loading: '',
    custom: '',
    blank: '',
  },
}

const Toaster = () => {
  return (
    <HotToaster position="bottom-right">
      {(t) => (
        <Transition
          appear
          as={Fragment}
          show={t.visible}
          enter="transition transform ease-out duration-300"
          enterFrom="opacity-0 translate-x-4"
          enterTo="opacity-100 translate-x-0"
          leave="transition transform ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              'my-2 flex origin-top-right items-center self-end rounded-t border-b-4 p-4 md:w-1/2',
              classes.colors[t.type]
            )}
          >
            {t.type === 'success' ? (
              <MdCheckBox className="mr-2 text-2xl" />
            ) : t.type === 'error' ? (
              <MdErrorOutline className="mr-2 text-2xl" />
            ) : null}
            <p>{resolveValue(t.message, t)}</p>
          </div>
        </Transition>
      )}
    </HotToaster>
  )
}

export default Toaster