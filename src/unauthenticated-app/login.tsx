import React, { useCallback } from 'react'
import { useAuth } from '../context/auth-context'
import { LongButton } from './index'
import { Form, Input } from 'antd'

export const LoginScreen = () => {
  const { login } = useAuth()

  const handleSubmit = useCallback(
    (values: { username: string; password: string }) => {
      login(values)
    },
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
          <LongButton htmlType={'submit'} type="primary">
            登录
          </LongButton>
        </Form.Item>
      </Form>
    </>
  )
}
