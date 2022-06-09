import { useCallback, useReducer, useRef } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'nested':
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],

          [action.payload.nestedkey]:
            Number.isInteger(Number(action.payload.value)) && action.payload.nestedkey !== 'checked'
              ? +action.payload.value
              : action.payload.value,
        },
      }
    default:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      }
  }
}

const useFilters = (initState: Parameters<typeof useReducer>[1]) => {
  const lastState = useRef<ReturnType<typeof reducer>>(initState)
  const getState = useCallback(() => lastState.current, [])
  return [
    ...useReducer(
      // eslint-disable-next-line no-return-assign
      (filters: Parameters<typeof reducer>[0], action: Parameters<typeof reducer>[1]) =>
        (lastState.current = reducer(filters, action)),
      initState
    ),
    getState,
  ]
}

export default useFilters
