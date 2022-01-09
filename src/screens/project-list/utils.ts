import { useMemo } from 'react'
import { useHttp } from '../../utils/http'
import { useUrlQueryParams } from '../../utils/url'
import { useAsync } from '../../utils/use-async'
import { Project } from './list'
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

/* 编辑项目 */
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()

  const client = useHttp()

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params
      })
    )
  }

  return {
    mutate,
    ...asyncResult
  }
}

/* 新增项目 */
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: 'POST',
        data: params
      })
    )
  }

  return {
    mutate,
    ...asyncResult
  }
}
