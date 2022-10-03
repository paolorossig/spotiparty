import clsx from 'clsx'

const Tooltip = ({
  message,
  children,
}: {
  message: string
  children: React.ReactNode
}) => {
  return (
    <div className="group relative flex flex-col items-center">
      {children}
      <div
        className={clsx(
          'invisible absolute top-9 flex flex-col items-center opacity-0 transition-opacity duration-300 ease-in',
          'group-hover:visible group-hover:opacity-100'
        )}
      >
        <div className="-mb-2 h-3 w-3 rotate-45 bg-gray-600" />
        <span className="relative z-10 rounded-md bg-gray-600 p-2 text-xs leading-none text-white shadow-lg">
          {message}
        </span>
      </div>
    </div>
  )
}

export default Tooltip
