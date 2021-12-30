/** @jsx jsx */
import { jsx } from '@emotion/react'

import React from 'react'

import { Input, Select, Form } from 'antd'
export interface User {
  id: string
  name: string
  email: string
  title: string
  token: string
  organization: string
}
interface SearchPanelProps {
  param: { name: string; personId: string }
  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form layout={'inline'} css={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder={'名称'}
          value={param.name}
          onChange={(evt) => {
            setParam({ ...param, name: evt.target.value })
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({ ...param, personId: value })
          }}
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
