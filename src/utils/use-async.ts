import { useState } from 'react'

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: 'idle'
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const setData = (data: D) =>
    setState({
      data,
      error: null,
      stat: 'success'
    })

  const setError = (error: Error) =>
    setState({
      error,
      data: null,
      stat: 'error'
    })

  const run = (promise: Promise<D>) => {
    setState({
      ...state,
      stat: 'loading'
    })
    if (!promise || !promise.then) {
      throw new Error('请传入Promise')
    }
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((error) => {
        setError(error)
        return error
      })
  }

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    ...state,
    setData,
    setError,
    run
  }
}
