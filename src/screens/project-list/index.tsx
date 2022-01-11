import styled from '@emotion/styled'

import React from 'react'

import { useDebounce } from '../../utils'
import { useProjects } from '../../utils/project'
import { useUsers } from '../../utils/user'

import { SearchPanel } from './search-panel'
import { List } from './list'
import { Typography } from 'antd'
import { useProjectSearchParams } from './utils'

export const ProjectListScreen = () => {
  // const [, setParam] = useState({
  //   name: '',
  //   personId: ''
  // })

  const [param, setParam] = useProjectSearchParams()

  const {
    isLoading,
    error,
    data: list,
    retry
  } = useProjects(useDebounce(param, 500))

  const { data: users } = useUsers()
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
        refresh={retry}
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
