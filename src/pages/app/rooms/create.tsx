import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BsChevronLeft } from 'react-icons/bs'
import AppLayout from 'modules/ui/layouts/AppLayout'
import Button from 'modules/ui/components/Button'
import Dropzone from 'modules/ui/components/Dropzone'
import IconButton from 'modules/ui/components/IconButton'
import { useCreateRoomMutation } from 'modules/rooms/services/roomApi'

export interface FormValues {
  name: string
  description: string
  image: FileList
}

type FormKeys = keyof FormValues

const Create = () => {
  const router = useRouter()
  const [createRoom, { isLoading }] = useCreateRoomMutation()
  const { register, handleSubmit, control, formState } = useForm<FormValues>()
  const { errors: formErrors } = formState

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData()
    const keys = Object.keys(data) as Array<FormKeys>
    keys.forEach((key) => {
      key === 'image'
        ? data.image?.length && formData.append(key, data[key][0])
        : formData.append(key, data[key])
    })

    try {
      await createRoom(formData).unwrap()
      return router.push('/app')
    } catch (error: any) {
      toast.error(error.message.split(': ').pop() ?? '', {
        duration: 3000,
      })
    }
  }

  return (
    <AppLayout>
      <div className="mb-8 flex items-center space-x-2">
        <IconButton
          Icon={BsChevronLeft}
          onClick={() => router.back()}
          className="pr-[2px]"
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
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => (
            <Dropzone message="PNG or JPG (Max. 10MB)" onChange={onChange} />
          )}
          // TODO: add rules={{ required: 'Required field' }}
        />
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Create
        </Button>
      </form>
    </AppLayout>
  )
}

export default Create
