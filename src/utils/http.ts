import qs from 'qs'
import { useCallback } from 'react'
import * as auth from '../auth-provider'
// import { cleanUrlEmptyObject } from './index'
import { useAuth } from '../context/auth-context'
const BaseUrl = process.env.REACT_APP_API_URL
interface Config extends RequestInit {
  data?: object
  token?: string
}

/* 不自带token的请求 */
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${BaseUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

/* 自带token的hook请求 */

export const useHttp = () => {
  const { user } = useAuth()
  /* 这里写出数组和展开是为了使用 Parameters操作符 和 调用函数时参数传递方式不改变*/
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  )
}
