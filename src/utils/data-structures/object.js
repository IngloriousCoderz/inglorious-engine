import { curry } from '@ezpz/utils/functions/function'

const INITIAL_LEVEL = 0
const NEXT_LEVEL = 2

export const filter = curry((callback, obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key, value], obj) => callback(key, value, obj))
  )
)

export const find = curry((callback, obj) =>
  Object.fromEntries([
    Object.entries(obj).find(([key, value], obj) => callback(key, value, obj)),
  ])
)

export const map = curry((callback, obj) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = callback(key, value, obj)
    return acc
  }, {})
)

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
