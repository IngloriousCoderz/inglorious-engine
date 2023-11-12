import { isObject } from './object.js'

export function merge(dest, ...sources) {
  return sources
    .filter((source) => source != null)
    .reduce((acc, source) => deepMerge(acc, source), dest)
}

function deepMerge(dest, source) {
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value) || isObject(value)) {
      if (dest[key] === undefined) {
        dest[key] = new value.__proto__.constructor()
      }
      dest[key] = deepMerge(dest[key], value)
    } else {
      dest[key] = value
    }
  }
  return dest
}
