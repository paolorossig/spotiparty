import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import AppLayout from '../../../components/Layouts/AppLayout'

export interface FormValues {
  name: string
  owner: string
}

const Create = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { errors } = formState

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log({ data })
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
            placeholder="Rooms name"
            {...register('name', { required: 'Required field' })}
            className={`${
              errors.name &&
              'border-red-600 focus:border-red-600 focus:ring-red-600'
            }`}
          />
          {errors.name && (
            <p className="text-right text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="min-h-[66px]">
          <input
            type="text"
            placeholder="Rooms owner"
            {...register('owner', { required: 'Required field' })}
            className={`${
              errors.owner &&
              'border-red-600 focus:border-red-600 focus:ring-red-600'
            }`}
          />
          {errors.owner && (
            <p className="text-right text-red-600">{errors.owner.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-2 h-[42px] rounded-full bg-green-500 text-white hover:bg-green-800"
        >
          Create
        </button>
      </form>
    </AppLayout>
  )
}

export default Create
