import clsx from 'clsx'

const Alert = ({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  className: string
}) => {
  return (
    <div
      role="alert"
      className={clsx(
        'relative w-full rounded-lg border p-4',
        '[&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7',
        className,
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>
      <p className="text-sm leading-relaxed">{description}</p>
    </div>
  )
}

export default Alert
