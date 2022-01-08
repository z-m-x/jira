import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanUrlEmptyObject } from '../utils'

export const useUrlQueryParams = <K extends string>(queryKeys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams() //url query参数获取，api参照标准webapi

  return [
    useMemo(
      () =>
        queryKeys.reduce((pre, key) => {
          //基础内置hook依赖项对比如果是内置hook创建出来的话内部就不会认为改变了也不会重新执行hook；

          return { ...pre, [key]: searchParams.get(key) || '' }
        }, {} as { [key in K]: string }),
      //eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),

    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(
        cleanUrlEmptyObject({
          ...Object.fromEntries(searchParams),
          ...params
        }) as URLSearchParamsInit
      )
    }
  ] as const
  /*

    [queryKeys.reduce((pre, key) => {

    return { ...pre, [key]: searchParams.get(key) }

    }, {}), setSearchParams]，由于使用数组，这一段会被ts推断为{}[]类型，因为使用ts不指定为元组类型，就默认为数组，并且元素都是对象类型；

    采用const 表示将类型变为字面量类型；

   */
}
