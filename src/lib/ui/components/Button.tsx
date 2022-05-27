import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import Spinner from './Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
  isLoading?: boolean
  variant?: 'primary' | 'light' | 'dark'
}

const classes = {
  variant: {
    primary: 'bg-green-500 hover:bg-green-800 text-white',
    light: 'bg-white hover:bg-gray-200',
    dark: 'bg-black hover:bg-[#1d1d1d] text-white',
  },
}

const Button = ({
  children,
  className,
  isLoading = false,
  variant = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'my-4 rounded-full py-2 text-base',
        'ring-offset-2 ring-offset-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-90',
        classes.variant[variant],
        className
      )}
    >
      {isLoading ? <Spinner variant="light" size="small" /> : children}
    </button>
  )
}

export default Button
