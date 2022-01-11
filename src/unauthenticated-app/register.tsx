import React, { useCallback } from 'react'
import { useAuth } from '../context/auth-context'
import { LongButton } from './index'

import { Form, Input } from 'antd'
import { useAsync } from '../utils/use-async'

export const RegisterScreen = ({
  onError
}: {
  onError: (error: Error) => void
}) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = useCallback(
    async ({
      cpassword,
      ...values
    }: {
      username: string
      password: string
      cpassword: string
    }) => {
      if (values.password !== cpassword) {
        onError(new Error('请确认两次输入的密码相同'))
        return
      }
      try {
        await run(register(values))
      } catch (e) {
        onError(e as Error)
      }
    },
    [register, onError, run]
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
          <Input placeholder={'密码'} type="password" />
        </Form.Item>
        <Form.Item
          name="cpassword"
          rules={[
            { required: true, message: 'Please input your confirmPassword!' }
          ]}
        >
          <Input placeholder={'确认密码'} type="password" />
        </Form.Item>
        <Form.Item>
          <LongButton loading={isLoading} htmlType={'submit'} type="primary">
            注册
          </LongButton>
        </Form.Item>
      </Form>
    </>
  )
}
