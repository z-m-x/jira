import React from 'react'
import { useAuth } from './context/auth-context'
import { ProjectListScreen } from './screens/project-list'

/* 用户已登录的面板 */
export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </>
  )
}
