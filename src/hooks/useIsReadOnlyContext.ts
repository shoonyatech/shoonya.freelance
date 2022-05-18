import { createContext, useContext } from 'react'

export const isReadOnlyContext = createContext(true)

function useIsReadOnlyContext() {
  const isReadOnly = useContext(isReadOnlyContext)
  return isReadOnly
}

export default useIsReadOnlyContext
