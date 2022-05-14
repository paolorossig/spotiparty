import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import AppLayout from '../../../components/Layouts/AppLayout'
import { useCreateRoomMutation } from '../../../features/rooms/roomApi'
import Toaster from '../../../components/Toaster'

export interface FormValues {
  name: string
  description: string
}

const Create = () => {
  const router = useRouter()
  const [createRoom] = useCreateRoomMutation()
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { errors: formErrors } = formState

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await createRoom(data).unwrap()
      if (response.success) return router.push('/app')
    } catch (error: any) {
      toast.error(error.data.error.message.split(': ').pop() ?? '', {
        duration: 3000,
      })
    }
  }

  return (
    <AppLayout>
      <h2 className="mb-8 text-2xl font-bold">Create a new Room</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 text-black"
      >
        <div className="min-h-[66px]">
          <input
            type="text"
            placeholder="Room's name"
            autoComplete="off"
            {...register('name', { required: 'Required field' })}
            className={`${
              formErrors.name &&
              'border-red-600 focus:border-red-600 focus:ring-red-600'
            }`}
          />
          {formErrors.name && (
            <p className="text-right text-red-600">{formErrors.name.message}</p>
          )}
        </div>
        <div className="min-h-[104px]">
          <textarea
            placeholder="Room's description"
            {...register('description', { required: 'Required field' })}
            className={`h-20 ${
              formErrors.description &&
              'border-red-600 focus:border-red-600 focus:ring-red-600'
            }`}
          />
          {formErrors.description && (
            <p className="text-right text-red-600">
              {formErrors.description.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="my-4 rounded-full bg-green-500 py-2 text-white hover:bg-green-800"
        >
          Create
        </button>
      </form>
      <Toaster />
    </AppLayout>
  )
}

export default Create
