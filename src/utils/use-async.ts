import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from '.'

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
const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  //封装组件卸载时setState的动作
  const mountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  )
}

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig
  }

  const [retry, setRetry] = useState(() => () => {}) //缓存本次异步函数

  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    { ...defaultInitialState, ...initialState }
  ) //第一个回调可以自定义，常规的action是一个type,value属性的对象

  const safeDispatch = useSafeDispatch(dispatch)

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        error: null,
        stat: 'success'
      }),
    [safeDispatch]
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        stat: 'error'
      }),
    [safeDispatch]
  )
  //runConfig?:{retry:()=>Promise<D>} 为什么还需要把请求的Promise通过函数传入？因为外界调用run函数传入一个Promise已经被执行了，然后将返回的结果当成参数传入了run；
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      safeDispatch({ stat: 'loading' })

      if (!promise || !promise.then) {
        throw new Error('请传入Promise')
      }
      if (runConfig?.retry) {
        //存储本次的异步函数
        setRetry(() => () => run(runConfig?.retry(), runConfig))
      }

      return promise
        .then((data) => {
          //异步在组件卸载时还未终止，异步结果回来后对已卸载组件状态做出操作，会触发以下错误
          /*
          Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        */
          setData(data)
          return data
        })
        .catch((error) => {
          //catch会消化异常，如果不主动抛出，外面接受不到异常
          setError(error)
          if (config.throwOnError) return Promise.reject(error)
          return error
        })
    },
    [config.throwOnError, setData, setError, safeDispatch]
  )

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    ...state,
    setData,
    setError,
    run,
    // retry 被调用时，重新执行一次run，让state刷新一次（用于关联数据更新后的更新）
    retry
  }
}
