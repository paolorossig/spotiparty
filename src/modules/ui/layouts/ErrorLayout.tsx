import { useRouter } from 'next/router'
import { FiRefreshCw } from 'react-icons/fi'

import AppLayout from './AppLayout'

interface ErrorLayoutProps {
  title: string
  message?: string
}

const ErrorLayout = ({ title, message }: ErrorLayoutProps) => {
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
          <FiRefreshCw className="text-xl" />
          <span>Go back</span>
        </button>
      </div>
    </AppLayout>
  )
}

export default ErrorLayout
