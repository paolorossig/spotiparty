import clsx from 'clsx'
import Spinner from './Spinner'

const classes = {
  variant: {
    primary: 'bg-green-500 hover:bg-green-800 text-white',
    light: 'bg-white hover:bg-gray-200 text-black',
    dark: 'bg-black hover:bg-[#1d1d1d] text-white',
  },
}

const Button = ({
  children,
  className,
  isLoading = false,
  variant = 'primary',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  variant?: 'primary' | 'light' | 'dark'
}) => {
  return (
    <button
      {...props}
      className={clsx(
        'ring-on-focus my-4 rounded-full px-4 py-2 text-base',
        'disabled:cursor-not-allowed disabled:opacity-50',
        classes.variant[variant],
        className
      )}
    >
      {isLoading ? <Spinner variant="light" size="small" /> : children}
    </button>
  )
}

export default Button
