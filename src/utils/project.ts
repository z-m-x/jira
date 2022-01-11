import { useAsync } from './use-async'
import { useHttp } from './http'
import { cleanUrlEmptyObject } from './index'
import type { Project } from '../screens/project-list/list'
import { useCallback, useEffect } from 'react'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  const { run, ...rest } = useAsync<Project[]>()

  const fetchProjects = useCallback(
    () =>
      client('projects', {
        data: cleanUrlEmptyObject(param || {})
      }),
    [client, param]
  )

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
  }, [param, run, fetchProjects])

  return rest
}
