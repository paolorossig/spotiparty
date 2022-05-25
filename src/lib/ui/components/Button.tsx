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
    primary: 'bg-green-500 border-green-500 hover:bg-green-800 text-white',
    light: 'bg-white border-white hover:bg-gray-200',
    dark: 'bg-black border-black hover:bg-[#1d1d1d] text-white',
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
        'my-4 rounded-full border py-2 text-base',
        classes.variant[variant],
        className
      )}
    >
      {isLoading ? <Spinner variant="light" size="small" /> : children}
    </button>
  )
}

export default Button
