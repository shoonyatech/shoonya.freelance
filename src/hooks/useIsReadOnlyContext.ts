import { useContext } from 'react'

import isReadOnlyContext from '../context/isReadOnlyContext'

function useIsReadOnlyContext() {
  const isReadOnly = useContext(isReadOnlyContext)
  return isReadOnly
}

export default useIsReadOnlyContext
