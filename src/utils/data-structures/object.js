const INITIAL_LEVEL = 0
const NEXT_LEVEL = 2

export function filter(obj, callback) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value], obj) => callback(key, value, obj))
  )
}

export function find(obj, callback) {
  return Object.fromEntries([
    Object.entries(obj).find(([key, value], obj) => callback(key, value, obj)),
  ])
}

export function map(obj, callback) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = callback(key, value, obj)
    return acc
  }, {})
}

export function toString(obj, level = INITIAL_LEVEL) {
  if (Array.isArray(obj)) {
    return `[
${obj
  .map(
    (item) =>
      ' '.repeat(level + NEXT_LEVEL) + toString(item, level + NEXT_LEVEL)
  )
  .join(',\n')}
${' '.repeat(level)}]`
  }

  if (typeof obj === 'object' && obj != null) {
    return `{
${Object.entries(obj)
  .map(
    ([key, value]) =>
      `${' '.repeat(level + NEXT_LEVEL)}${key}: ${toString(
        value,
        level + NEXT_LEVEL
      )}`
  )
  .join(',\n')}
${' '.repeat(level)}}`
  }

  if (typeof obj === 'string') {
    return `'${obj}'`
  }

  return obj
}
