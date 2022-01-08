/** @jsx jsx */
import { jsx } from '@emotion/react'

import React from 'react'

import { Input, Form } from 'antd'
import { Project } from './list'
import { UserSelect } from '../../components/user-select'
export interface User {
  id: number
  name: string
  email: string
  title: string
  token: string
  organization: string
}
interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>> //Partial之后就允许把undefined赋值给字段
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
        <UserSelect
          value={param.personId}
          onChange={(value) => {
            setParam({ ...param, personId: value })
          }}
          defaultOptionName={'负责人'}
        />
      </Form.Item>
    </Form>
  )
}
