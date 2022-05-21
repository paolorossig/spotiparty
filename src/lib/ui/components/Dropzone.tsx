import type { UseFormRegisterReturn } from 'react-hook-form'
import { BsCloudUpload } from 'react-icons/bs'

interface Props {
  accept?: string
  message?: string
  register?: UseFormRegisterReturn
}

const Dropzone = ({ accept, message, register }: Props) => {
  return (
    <label
      htmlFor="dropzone"
      className="group flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-[#1d1d1d]"
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-200">
        <BsCloudUpload className="mb-3 text-4xl group-hover:animate-ping" />
        <p className="mb-1 text-sm">
          <span className="font-semibold">Click to upload</span> or drag and
          drop
        </p>
        <p className="text-xs text-gray-300">{message}</p>
      </div>
      <input
        id="dropzone"
        type="file"
        className="hidden"
        accept={accept}
        {...register}
      />
    </label>
  )
}

export default Dropzone
