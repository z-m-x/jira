export const cleanUrlEmptyObject = (object: object) => {
  const obj = { ...object }

  Object.keys(object).forEach((key) => {
    //@ts-ignore
    const value = object[key]
    //@ts-ignore

    if (!value ?? false) delete obj[key]
  })
  return obj
}
