import { useAsync } from './use-async'
import { useHttp } from './http'
import { cleanUrlEmptyObject } from './index'
import type { Project } from '../screens/project-list/list'
import { useEffect } from 'react'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  const { run, ...rest } = useAsync<Project[]>()
  useEffect(() => {
    run(
      client('projects', {
        data: cleanUrlEmptyObject(param || {})
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return rest
}
