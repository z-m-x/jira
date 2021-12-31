import { useAsync } from './use-async'
import { useHttp } from './http'
import { cleanUrlEmptyObject } from './index'
import { User } from '../screens/project-list/search-panel'
import { useEffect } from 'react'

export const useUser = (param?: Partial<User>) => {
  const client = useHttp()

  const { run, ...rest } = useAsync<User[]>()
  useEffect(() => {
    run(
      client('users', {
        data: cleanUrlEmptyObject(param || {})
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])
  return rest
}
