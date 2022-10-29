import clsx from 'clsx'

const classes = {
  size: {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16',
  },
  variant: {
    primary: 'border-green-500',
    light: 'border-white',
    dark: 'border-black',
  },
}

const Spinner = ({
  size = 'medium',
  variant = 'primary',
}: {
  size?: keyof typeof classes['size']
  variant?: keyof typeof classes['variant']
}) => {
  return (
    <div className="grid flex-1 place-content-center">
      <div
        className={clsx(
          classes.size[size],
          classes.variant[variant],
          'animate-spin rounded-full border-2 border-t-transparent'
        )}
      />
    </div>
  )
}

export default Spinner
