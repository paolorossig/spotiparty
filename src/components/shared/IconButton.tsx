import clsx from 'clsx'

const classes = {
  size: {
    small: 'h-8 w-8',
    medium: 'h-11 w-11',
    large: 'h-14 w-14',
  },
  iconSize: {
    small: 'h-5 w-5',
    medium: 'h-7 w-7',
    large: 'h-9 w-9',
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
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  Icon: React.ComponentType<any>
  size?: keyof (typeof classes)['size']
  variant?: keyof (typeof classes)['variant']
}) => {
  return (
    <button
      {...props}
      className={clsx(
        'ring-on-focus grid h-8 w-8 place-content-center rounded-full',
        'disabled:cursor-not-allowed disabled:opacity-50',
        classes.size[size],
        classes.variant[variant],
        className,
      )}
    >
      <Icon className={classes.iconSize[size]} />
    </button>
  )
}

export default IconButton
