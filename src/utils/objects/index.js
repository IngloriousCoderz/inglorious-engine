import _merge from 'lodash.merge'

export function map(obj, callback) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = callback(key, value, obj)
    return acc
  }, {})
}

export function merge(...objs) {
  return _merge(...objs)
}
