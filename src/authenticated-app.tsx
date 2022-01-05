import React from 'react'
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { useAuth } from './context/auth-context'
import { ProjectListScreen } from './screens/project-list'
import styled from '@emotion/styled'
import { Dropdown, Menu, Button } from 'antd'
import { Row } from './components/lib'
import { Routes, Route, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from './screens/project'
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */
/* 用户已登录的面板 */
export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />

      <Main>
        <Router>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />}></Route>
            <Route
              /* 在当前路由下使用跳转，不以'/'开头的路径，Router会认为是当前匹配的大路由的子路由，以/拼接当前路由后方  */
              /* 如果跳转的路径以 '/'开头，表示是新的路由配置，将不会作为子路由进行匹配 */
              /* ':'表示动态的路由，作为一个占位符匹配动态的值,常常动态路由使用 */
              /* '*'表示匹配到有此基础路径都正常作为子路由和子组件渲染  */
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />}
            ></Route>
            <Route path={''} element={<Navigate to={'/projects'} />}></Route>
          </Routes>
        </Router>
      </Main>
    </Container>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button onClick={logout} type={'link'}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={'link'} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``

export const resetRoute = () => {
  window.location.href = window.location.origin
}
