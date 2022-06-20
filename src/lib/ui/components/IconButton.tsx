import clsx from 'clsx'

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: React.ComponentType<any>
  size?: 'small' | 'medium' | 'large'
  variant?: 'solid' | 'transparent'
  className?: string
  strokeWidth?: number
}

const classes = {
  size: {
    small: 'h-8 w-8',
    medium: 'h-11 w-11',
    large: 'h-14 w-14',
  },
  iconSize: {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  },
  variant: {
    solid: 'bg-gray-700 hover:bg-gray-800',
    transparent: 'bg-transparent hover:bg-gray-800',
  },
}

const IconButton = ({
  Icon,
  size = 'small',
  variant = 'transparent',
  className,
  strokeWidth,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'grid h-8 w-8 place-content-center rounded-full',
        classes.size[size],
        classes.iconSize[size],
        classes.variant[variant],
        className
      )}
    >
      <Icon className="text-xl" strokeWidth={strokeWidth ?? 0} />
    </button>
  )
}

export default IconButton
