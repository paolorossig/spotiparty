import { useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import type { Room } from '@prisma/client'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/shared/Button'
import { api } from '@/lib/api'

interface EditRoomFormInputs {
  name: string
  description: string
}

const EditRoomDialog = ({
  room,
  isOpen,
  toggle,
}: {
  room: Room
  isOpen: boolean
  toggle: () => void
}) => {
  const { roomId, name, description } = room

  const { handleSubmit, reset, register } = useForm<EditRoomFormInputs>({
    defaultValues: { name, description },
  })

  const context = api.useContext()
  const mutation = api.rooms.update.useMutation({
    onSuccess(input) {
      context.rooms.getByRoomId.invalidate({ roomId: input.roomId })
    },
  })

  useEffect(() => {
    if (name && description) {
      reset({ name, description })
    }
  }, [name, description, reset])

  const onClose = () => {
    reset()
    toggle()
  }

  const onSubmit: SubmitHandler<EditRoomFormInputs> = (data) => {
    mutation.mutate({ roomId, ...data })
    return onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-end justify-center md:items-center">
        <Dialog.Panel className="flex h-1/2 w-full max-w-lg flex-col rounded-t-lg bg-gray-700 p-4 md:h-min md:rounded-lg">
          <Dialog.Title as="h2" className="mb-3 text-2xl font-bold">
            Edit Room
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col"
          >
            <div className="flex-1 space-y-8">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="mt-1 text-black"
                  {...register('name', { required: true })}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  autoComplete="off"
                  className="mt-1 text-black"
                  {...register('description', { required: true })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 px-2 md:mt-8 md:gap-8 md:px-4">
              <Button type="button" onClick={onClose} variant="light">
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default EditRoomDialog
