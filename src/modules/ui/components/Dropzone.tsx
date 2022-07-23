import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BsCloudUpload } from 'react-icons/bs'
import { RiCloseCircleLine } from 'react-icons/ri'
import { fromBytesToMegabytes } from '../utils/conversions'

type ExtendedFile = File & { preview: string; path?: string }

interface DropzoneProps {
  message?: string
  onChange?: (...event: any[]) => void
  maxFiles?: number
}

interface PreviewImageProps {
  files: ExtendedFile[]
  onRemove: (fileName: string) => void
}

const PreviewImages = ({ files, onRemove }: PreviewImageProps) => {
  return (
    <ul
      className={clsx(
        'flex h-64 flex-wrap justify-center gap-4',
        !files.length && 'hidden'
      )}
    >
      {files.map((file) => (
        <li key={file.preview} className="grid place-content-center text-white">
          <picture className="group relative">
            <div className="absolute top-0 z-10 hidden h-full w-full flex-col items-center bg-black/80 text-white opacity-100 group-hover:flex">
              <button
                onClick={() => onRemove(file.name)}
                className="mt-2 mr-2 self-end"
              >
                <RiCloseCircleLine className="text-2xl hover:text-red-500" />
              </button>
              <p className="flex flex-1 items-center">
                {file.path} - {fromBytesToMegabytes(file.size)} MB
              </p>
            </div>
            <Image
              src={file.preview}
              alt={file.name}
              width={220}
              height={220}
              onLoad={() => {
                URL.revokeObjectURL(file.preview)
              }}
              className="rounded-lg object-cover"
            />
          </picture>
        </li>
      ))}
    </ul>
  )
}

const Dropzone = ({ message, onChange, maxFiles = 1 }: DropzoneProps) => {
  const [files, setFiles] = useState<ExtendedFile[]>([])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      onChange && onChange(acceptedFiles)
      const newFiles = acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      }))
      setFiles(newFiles)
    },
    maxFiles,
  })

  const removePreview = (fileName: string) =>
    setFiles((files) => files.filter((file) => file.name !== fileName))

  return (
    <>
      <div
        {...getRootProps()}
        className={clsx(
          'group flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300',
          'hover:bg-[#1d1d1d] focus:border-transparent focus:outline-none focus:ring focus:ring-green-500 focus:ring-opacity-90',
          isDragActive && 'bg-[#1d1d1d]',
          files.length > 0 && 'hidden'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-200">
          <BsCloudUpload className="mb-3 text-4xl group-hover:animate-ping" />
          <p className="mb-1 text-sm">
            <span className="special-underline font-bold">Click to upload</span>{' '}
            or drag and drop
          </p>
          <p className="text-xs text-gray-300">{message}</p>
        </div>
      </div>
      <PreviewImages files={files} onRemove={removePreview} />
    </>
  )
}

export default Dropzone
