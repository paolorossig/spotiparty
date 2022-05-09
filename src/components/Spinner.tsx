interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

const Spinner = ({ size = 'medium' }: SpinnerProps) => {
  return (
    <div className="grid flex-1 place-content-center">
      <div
        className={`${
          size === 'small'
            ? 'h-6 w-6'
            : size === 'large'
            ? 'h-16 w-16'
            : 'h-10 w-10'
        } animate-spin rounded-full border-2 border-green-500 border-t-transparent`}
      />
    </div>
  )
}

export default Spinner
