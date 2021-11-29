import { useState, useEffect } from 'react'
export function useDebounce(value: any, time: number) {
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

export function useDebounce2(callback: () => void, time: number) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback()
    }, time)
    return () => {
      clearTimeout(timer)
    }
  }, [callback, time])
}
