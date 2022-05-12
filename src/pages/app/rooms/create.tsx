import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import { MdErrorOutline } from 'react-icons/md'
import { Transition } from '@headlessui/react'
import AppLayout from '../../../components/Layouts/AppLayout'

export interface FormValues {
  name: string
  description: string
}

const Create = () => {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<FormValues>()
  const { errors: formErrors } = formState

  const [apiError, setApiError] = useState('')

  useEffect(() => {
    if (apiError) {
      setTimeout(() => {
        setApiError('')
      }, 3000)
    }
  }, [apiError])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    if (res.success) return router.push('/app')
    setApiError(res?.error.message.split(': ').pop())
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
          className="my-4 h-[42px] rounded-full bg-green-500 text-white hover:bg-green-800"
        >
          Create
        </button>
        <Transition
          as={Fragment}
          show={apiError !== ''}
          enter="transition transform ease-out duration-300"
          enterFrom="opacity-0 translate-x-4"
          enterTo="opacity-100 translate-x-0"
          leave="transition transform ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="my-2 flex origin-top-right items-center self-end rounded-t border-b-4 border-b-red-600 bg-red-100 p-4 text-red-600 md:w-1/2">
            <MdErrorOutline className="mr-2 text-2xl" />
            <p>{apiError}</p>
          </div>
        </Transition>
      </form>
    </AppLayout>
  )
}

export default Create
