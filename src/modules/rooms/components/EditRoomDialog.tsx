import type { Room } from 'types/rooms'
import toast from 'react-hot-toast'
import { Dialog } from '@headlessui/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import Button from 'modules/ui/components/Button'
import { useUpdateRoomMutation } from 'modules/rooms/services/roomApi'

interface EditRoomDialogProps {
  room: Room
  isOpen: boolean
  toggle: () => void
}

interface EditRoomFormInputs {
  name: string
  description: string
}

const EditRoomDialog = ({ room, isOpen, toggle }: EditRoomDialogProps) => {
  const { name, description } = room

  const { handleSubmit, control, reset } = useForm<EditRoomFormInputs>({
    defaultValues: { name, description },
  })
  const [updateRoom] = useUpdateRoomMutation()

  const onClose = () => {
    reset()
    toggle()
  }

  const onSubmit: SubmitHandler<EditRoomFormInputs> = async (data) => {
    try {
      await updateRoom({ _id: room._id, ...data }).unwrap()
      toggle()
      toast.success('Room succesfully edited')
    } catch (error: any) {
      toast.error(error.message.split(': ').pop() ?? '', {
        duration: 3000,
      })
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-gray-700 p-4">
          <Dialog.Title as="h2" className="mb-3 text-2xl font-bold">
            Edit Room
          </Dialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-2"
          >
            <div>
              <label htmlFor="name">Name</label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input type="text" className="mt-1 text-black" {...field} />
                )}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="text"
                    autoComplete="off"
                    className="mt-1 text-black"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="flex justify-evenly gap-4">
              <Button onClick={onClose} variant="light">
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
