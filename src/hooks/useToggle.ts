import { useCallback, useState } from 'react'

function useToggle(initialState: boolean = false): [boolean, () => void] {
  const [state, setState] = useState<boolean>(initialState)

  const toggle = useCallback((): void => setState((state) => !state), [])

  return [state, toggle]
}

export default useToggle
