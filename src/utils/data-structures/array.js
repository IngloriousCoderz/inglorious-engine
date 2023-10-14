/* eslint-disable no-magic-numbers */

const DEFAULT_COMPARATOR = (a, b) => b - a

export function contains(arr, item) {
  return arr.includes(item)
}

export function pop(arr, comparator = DEFAULT_COMPARATOR) {
  const item = min(arr, comparator)
  return remove(arr, item)
}

export function push(arr, item) {
  return [...arr, item]
}

export function max(arr, comparator = DEFAULT_COMPARATOR) {
  return arr.reduce((acc, item) => (comparator(item, acc) < 0 ? item : acc))
}

export function min(arr, comparator = DEFAULT_COMPARATOR) {
  return arr.reduce((acc, item) => (comparator(item, acc) > 0 ? item : acc))
}

export function remove(arr, item) {
  return arr.filter((el) => el !== item)
}
