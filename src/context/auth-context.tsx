import React, { useContext, useState } from 'react'
import { ReactNode } from 'react'
import * as auth from '../auth-provider'
import { User } from '../screens/project-list/search-panel'
const AuthContext = React.createContext<
  | {
      login: (loginForm: AuthForm) => Promise<void>
      register: (loginForm: AuthForm) => Promise<void>
      loginout: () => Promise<void>
      user: User | null
    }
  | undefined
>(undefined)

interface AuthForm {
  username: string
  password: string
}
/* 封装用户Provider 将用户相关数据和操作封装传递到应用子组件*/
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const login = (loginForm: AuthForm) =>
    auth.login(loginForm).then((res) => setUser(res))

  const register = (loginForm: AuthForm) =>
    auth.register(loginForm).then((res) => setUser(res))

  const loginout = () => auth.logout().then(() => setUser(null))

  return (
    <AuthContext.Provider
      value={{ login, register, loginout, user }}
      children={children}
    ></AuthContext.Provider>
  )
}
export default AuthProvider
/* 封装useAuth hook */
export const useAuth = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) {
    throw new Error('useAuth必须在AuthContext.Provider包裹中使用')
  }
  return authContext
}
