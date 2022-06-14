import clsx from 'clsx'

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ComponentType<any>
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const classes = {
  size: {
    small: 'h-8 w-8',
    medium: 'h-11 w-11',
    large: 'h-14 w-14',
  },
}

const IconButton = ({
  Icon,
  size = 'small',
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'grid h-8 w-8 place-content-center rounded-full',
        'hover:bg-gray-800',
        classes.size[size],
        className
      )}
    >
      <Icon className="text-xl" />
    </button>
  )
}

export default IconButton
