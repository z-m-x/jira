import { useState, useEffect } from 'react'

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
