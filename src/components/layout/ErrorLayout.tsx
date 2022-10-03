import { useRouter } from 'next/router'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

import AppLayout from './app'

const ErrorLayout = ({
  title,
  message,
}: {
  title: string
  message?: string
}) => {
  const router = useRouter()

  return (
    <AppLayout>
      <div className="flex flex-col items-center pt-28">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-gray-500">{message}</p>
        <button
          className="mt-4 flex items-center justify-center gap-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={() => router.back()}
        >
          <ArrowPathIcon className="h-5 w-5" />
          <span>Go back</span>
        </button>
      </div>
    </AppLayout>
  )
}

export default ErrorLayout
