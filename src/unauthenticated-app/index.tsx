import React, { useState } from 'react'
import { LoginScreen } from './login'
import { RegisterScreen } from './register'

import { Card, Button } from 'antd'
/* 用户未登录的面板 */
export const UnauthenticatedApp = () => {
  const [switchScreen, setSwitchScreen] = useState(true)

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card>
        {switchScreen ? <LoginScreen /> : <RegisterScreen />}
        <Button onClick={() => setSwitchScreen(!switchScreen)}>
          切换到{switchScreen ? '注册' : '登录'}
        </Button>
      </Card>
    </div>
  )
}
