import React, { useCallback, FormEvent } from 'react'
import { useAuth } from '../../context/auth-context'

export const LoginScreen = () => {
  const { user, register, login } = useAuth()

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    login({ password, username })
  }, [])

  return (
    <>
      {user ? (
        <>
          <div>用户名:{user.name}</div>
        </>
      ) : (
        <form action="" method="post" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">用户名：</label>
            <input type="text" id="username" />
          </div>
          <div>
            <label htmlFor="password">密码:</label>
            <input type="text" id="password" />
          </div>
          <div>
            <button type="submit">登录</button>
          </div>
        </form>
      )}
    </>
  )
}
