import { useRouter } from 'next/router'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { api } from '@/lib/api'

import AppLayout from '@/components/layout/app'
import Button from '@/components/shared/Button'
import IconButton from '@/components/shared/IconButton'

export interface FormValues {
  name: string
  description: string
}

const Create = () => {
  const router = useRouter()
  const context = api.useContext()
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { errors: formErrors } = formState

  const mutation = api.rooms.create.useMutation({
    onSuccess() {
      context.rooms.getCreated.invalidate()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutation.mutate(data)
    // TODO: Navigate to the room directly
    return router.push('/app')
  }

  return (
    <AppLayout>
      <div className="mb-8 flex items-center space-x-2">
        <IconButton
          Icon={ChevronLeftIcon}
          onClick={() => router.back()}
          className="pr-0.5"
        />
        <h2 className="text-2xl font-bold">Create a new Room</h2>
      </div>
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
        <Button type="submit" variant="primary" disabled={mutation.isLoading}>
          Create
        </Button>
      </form>
    </AppLayout>
  )
}

export default Create
