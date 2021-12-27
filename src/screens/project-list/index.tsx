import React from 'react'
import { useState, useEffect } from 'react'

import { useMount, useDebounce } from '../../hooks'
import { useHttp } from '../../utils/http'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanUrlEmptyObject } from '../../utils'

export const ProjectListScreen = () => {
  const client = useHttp()

  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const formValues = useDebounce(param, 500)
  const [list, setList] = useState([])

  useEffect(() => {
    client('projects', {
      data: cleanUrlEmptyObject(formValues)
    }).then(setList)
  }, [formValues])
  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  )
}
