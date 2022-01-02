import { Component, PropsWithChildren, ReactElement } from 'react'

type FullBackRender = ({ error }: { error: Error | null }) => ReactElement
//第三方错误边界组件 // https://github.com/bvaughn/react-error-boundary
class ErrorBoundary extends Component<
  PropsWithChildren<{ fullBackRender: FullBackRender }>,
  any
> {
  state = {
    error: null
  }
  //子组件发生代码异常，会触发
  static getDerivedStateFromError(error: Error) {
    /* 返回值会赋值给state */
    return { error }
  }
  render() {
    const { error } = this.state
    const { children, fullBackRender } = this.props
    if (error) return fullBackRender({ error })
    return children
  }
}

export default ErrorBoundary
