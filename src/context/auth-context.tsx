import React, { useContext } from 'react'
import { useMount } from '../utils'
import { ReactNode } from 'react'
import * as auth from '../auth-provider'
import { http } from '../utils/http'
import { User } from '../screens/project-list/search-panel'
import { useAsync } from '../utils/use-async'
import { FullPageErrorFallback, FullPageLoading } from '../components/lib'
const AuthContext = React.createContext<
  | {
      login: (loginForm: AuthForm) => Promise<void>
      register: (loginForm: AuthForm) => Promise<void>
      logout: () => Promise<void>
      user: User | null
    }
  | undefined
>(undefined)

interface AuthForm {
  username: string
  password: string
}

/* 用于刷新页面，AuthContext内的user初始化 */
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

/* 封装用户Provider 将用户相关数据和操作封装传递到应用子组件*/
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    isLoading,
    isIdle,
    isError,
    data: user,
    run,
    error,
    setData: setUser
  } = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () =>
    auth.logout().then(() => {
      setUser(null)
    })
  /* 初始化user */
  useMount(() => {
    run(bootstrapUser())
  })

  if (isLoading || isIdle) return <FullPageLoading />
  if (isError) return <FullPageErrorFallback error={error} />
  return (
    <AuthContext.Provider
      value={{ login, register, logout, user }}
      children={children}
    ></AuthContext.Provider>
  )
}
export default AuthProvider
/* 封装useAuth hook */
export const useAuth = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('useAuth必须在AuthProvider包裹中使用')
  }
  return authContext
}
