import React from 'react'
import './App.css'
// import { ProjectListScreen } from './screens/project-list'
import { LoginScreen } from './screens/login'
import { AppProviders } from './context'
function App() {
  return (
    <AppProviders>
      <LoginScreen />
    </AppProviders>
  )
}

export default App
