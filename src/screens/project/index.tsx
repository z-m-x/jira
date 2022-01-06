import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router'
import { KanbanScreen } from '../kanban'
import { EpicScreen } from '../epic'
export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
        {/* 未匹配到的路径的默认路由 */}
        <Route path={''} element={<Navigate to={'kanban'} />} />
      </Routes>
    </div>
  )
}
