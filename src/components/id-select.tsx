import { Select } from 'antd'
import React from 'react'
import { Raw } from '../types'

/*
 🐖如果后端约定id为字符串，见下述设计中number改为字符串；

 为了处理组件正确映射value 和 option；增加可预测性，向外界返回同统一的选中结果；做出以下设计；

 组件初始值value允许传入任何类型值，组件负责处理为number类型(Select value属性传入null和undefined类型会报错)，0表示选中默认选项，其余数字表示其选中他选项；isNaN（Number(value)）为true ，代表组件选中默认选项；这样即使外界传入的value和option匹配不上也能正确显示界面；

 通过onChange 向外界返回 number|undefined类型 的值，这样即使外界传入的value和option匹配不上也能获取到预测的结果；

*/

//运用工具类型

//React.ComponentProps<typeof Select> 提取组件定义的props类型；

//此处继承Select组件Props类型，用于外界透传参数到Select组件上，封装组件常用；
interface SelectProps
  extends Omit<
    React.ComponentProps<typeof Select>,
    'value' | 'onChange' | 'options'
  > {
  value: Raw | undefined | null

  onChange: (value?: number) => void

  defaultOptionName?: string

  options?: { name: string; id: number }[]
}

export const IdSelect = (param: SelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = param

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName && (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      )}
      {options?.map((options) => (
        <Select.Option value={options.id} key={options.id}>
          {options.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) =>
  window.isNaN(Number(value)) ? 0 : Number(value)
