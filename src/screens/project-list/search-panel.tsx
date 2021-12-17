import React from 'react'
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
        <input
          type="text"
          value={param.name}
          onChange={(evt) => {
            setParam({ ...param, name: evt.target.value })
          }}
        />
        <select
          name="search"
          value={param.personId}
          onChange={(evt) => {
            setParam({ ...param, personId: evt.target.value })
          }}
        >
          <option value={''}>负责人</option>
          {users.map((user) => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    </form>
  )
}
