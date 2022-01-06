import styled from '@emotion/styled'

import React from 'react'
import { useState } from 'react'

import { useDebounce } from '../../utils'
import { useProject } from '../../utils/project'
import { useUser } from '../../utils/user'

import { SearchPanel } from './search-panel'
import { List } from './list'
import { Typography } from 'antd'
import { useUrlQueryParams } from '../../utils/url'

export const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })

  const [param, setParam] = useUrlQueryParams(['name', 'personId'])

  const formValues = useDebounce(param, 500)

  const { isLoading, error, data: list } = useProject(formValues)

  const { data: users } = useUser()
  return (
    <Container>
      <h2>项目列表</h2>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      {error && (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      )}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      ></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
