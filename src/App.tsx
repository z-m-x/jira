import React from 'react'
import './App.less'
import { AuthenticatedApp } from './authenticated-app'
import { UnauthenticatedApp } from './unauthenticated-app'
import { useAuth } from './context/auth-context'
import ErrorBoundary from './components/error-boundary'
import { FullPageErrorFallback } from './components/lib'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fullBackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
