import React, { useState } from 'react'
import * as auth from '../auth-provider'
import { User } from '../screens/project-list/search-panel'
const AuthContext = React.createContext(undefined)

interface AuthForm {
  username: string
  password: string
}
/* 封装用户Provider 将用户相关数据和操作封装传递到应用子组件*/
export const AuthProvider = () => {
  const [user, setUser] = useState<User | null>(null)
  const login = (loginForm: AuthForm) => {
    auth.login(loginForm).then((res) => setUser(res))
  }
  const register = (loginForm: AuthForm) => {
    auth.register(loginForm).then((res) => setUser(res))
  }
  const loginout = (loginForm: AuthForm) => {
    auth.login(loginForm).then((res) => setUser(res))
  }

  return (
    <AuthContext.Provider
      value={{ login, register, loginout, user }}
    ></AuthContext.Provider>
  )
}
