// export const cleanUrlEmptyObject = (object: object) => { 读取值会报错因为object可以是function、字面量对象、实例对象，所以通过解构创建新对象会导致结果的类型被定义{}；
export const cleanUrlEmptyObject = (object: { [key: string]: unknown }) => {
  const obj = { ...object }

  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (!value ?? false) delete obj[key]
  })
  return obj
}
