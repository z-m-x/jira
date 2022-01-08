import { useMemo } from 'react'
import { useUrlQueryParams } from '../../utils/url'
/* 从url 获取project list查询参数 */
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(['name', 'personId'])

  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam
  ] as const //转换为number类型
}
