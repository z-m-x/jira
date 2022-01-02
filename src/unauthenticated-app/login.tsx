import React, { useCallback } from 'react'
import { useAuth } from '../context/auth-context'
import { LongButton } from './index'
import { Form, Input } from 'antd'
import { useAsync } from '../utils/use-async'

export const LoginScreen = ({
  onError
}: {
  onError: (error: Error) => void
}) => {
  const { login } = useAuth()

  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = useCallback(
    async (values: { username: string; password: string }) => {
      try {
        await run(login(values))
      } catch (e) {
        onError(e as Error)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [login]
  )

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder={'用户名'} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input placeholder={'密码'} />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type="primary">
            登录
          </LongButton>
        </Form.Item>
      </Form>
    </>
  )
}
