import React from 'react'
import { useState, useEffect } from 'react'

import { useMount, useDebounce } from '../../hooks'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanUrlEmptyObject } from '../../utils'
import qs from 'qs'
const BaseUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(
      `${BaseUrl}/projects?${qs.stringify(cleanUrlEmptyObject(param))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [param])
  useMount(() => {
    fetch('').then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
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
