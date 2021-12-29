import React from 'react'

import { Input, Select } from 'antd'
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
    <form>
      <div>
        <Input
          placeholder={'名称'}
          value={param.name}
          onChange={(evt) => {
            setParam({ ...param, name: evt.target.value })
          }}
        />
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
      </div>
    </form>
  )
}
