import { useState, useEffect, useRef } from 'react'

// export const cleanUrlEmptyObject = (object: object) => { 读取值会报错因为object可以是function、字面量对象、实例对象，所以通过解构创建新对象会导致结果的类型被定义{}；
export const cleanUrlEmptyObject = (object: { [key: string]: unknown }) => {
  const obj = { ...object }

  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (!value ?? false) delete obj[key]
  })
  return obj
}

export function useMount(callback: () => any) {
  const [isMount, setIsMount] = useState(true)
  useEffect(() => {
    if (isMount) {
      callback()
    }
    return () => {
      setIsMount(false)
    }
  })
  //setIsMount(false)//写在这里，会导致无限render
}
export function useDebounce<T>(value: T, time?: number): T {
  const [deValue, setDeValue] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeValue(value)
    }, time)
    return () => {
      clearTimeout(timer)
    }
  }, [value, time])
  return deValue
}

export function useDebounce2(callback: () => void, time?: number) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback()
    }, time)
    return () => {
      clearTimeout(timer)
    }
  }, [callback, time])
}

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}
