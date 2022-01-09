import { Rate } from 'antd'
import React from 'react'

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (pin: boolean) => void
}

export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(pin) => onCheckedChange?.(!!pin)}
      {...restProps}
    />
  )
}
