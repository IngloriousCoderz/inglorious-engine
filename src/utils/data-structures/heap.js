/* eslint-disable no-magic-numbers */

// @see https://stackfull.dev/heaps-in-javascript

const DEFAULT_COMPARATOR = (a, b) => b - a

export function contains(heap, item) {
  return heap.includes(item)
}

export function heapify(arr, comparator = DEFAULT_COMPARATOR) {
  let heap = []
  for (const item of arr) {
    heap = push(heap, item, comparator)
  }
  return heap
}

export function min(heap) {
  return heap[0]
}

export function push(heap, item, comparator = DEFAULT_COMPARATOR) {
  const h = [...heap, item]

  if (h.length === 1) {
    return h
  }

  let index = h.length - 1
  let parentIndex = parent(index)

  while (index > 0 && comparator(h[index], h[parentIndex]) > 0) {
    ;[h[index], h[parentIndex]] = [h[parentIndex], h[index]] // eslint-disable-line no-extra-semi

    index = parentIndex
    parentIndex = parent(index)
  }

  return h
}

export function pop(heap, comparator = DEFAULT_COMPARATOR) {
  const h = [...heap]
  ;[h[0], h[h.length - 1]] = [h[h.length - 1], h[0]]

  h.pop()

  let index = 0
  let leftIndex = left(index)
  let rightIndex = right(index)
  let newMinFound = false

  while (leftIndex < h.length && !newMinFound) {
    const minIndex =
      rightIndex < h.length && h[rightIndex] < h[leftIndex]
        ? rightIndex
        : leftIndex
    newMinFound = comparator(h[minIndex], h[index]) > 0

    if (newMinFound) {
      ;[h[minIndex], h[index]] = [h[index], h[minIndex]] // eslint-disable-line no-extra-semi

      index = minIndex
      leftIndex = left(index)
      rightIndex = right(index)
    }
  }

  return h
}

export function remove(heap) {
  const [, ...rest] = heap
  return heapify([...rest.slice(-1), ...rest.slice(0, -1)])
}

function left(index) {
  return 2 * index + 1
}

function right(index) {
  return 2 * index + 2
}

function parent(index) {
  return Math.floor((index - 1) / 2)
}
