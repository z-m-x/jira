import React, { useCallback } from 'react'
import { useAuth } from '../context/auth-context'
import { LongButton } from './index'

import { Form, Input } from 'antd'

export const RegisterScreen = () => {
  const { register } = useAuth()

  const handleSubmit = useCallback(
    (values: { username: string; password: string }) => {
      register(values)
    },
    [register]
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
            注册
          </LongButton>
        </Form.Item>
      </Form>
    </>
  )
}
