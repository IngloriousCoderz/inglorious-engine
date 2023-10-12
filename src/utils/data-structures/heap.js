/* eslint-disable no-magic-numbers */

// @see https://stackfull.dev/heaps-in-javascript

const DEFAULT_COMPARATOR = (a, b) => b - a

export function heapify(arr, comparator = DEFAULT_COMPARATOR) {
  let heap = []
  for (const value of arr) {
    heap = push(value, heap, comparator)
  }
  return heap
}

export function push(value, heap, comparator = DEFAULT_COMPARATOR) {
  const h = [...heap, value]

  let index = h.length - 1
  let parent = parentIndex(index)
  while (comparator(h[index], h[parent]) > 0) {
    ;[h[index], h[parent]] = [h[parent], h[index]] // eslint-disable-line no-extra-semi

    index = parent
    parent = parentIndex(index)
  }

  return h
}

export function pop(heap, comparator = DEFAULT_COMPARATOR) {
  const h = [...heap]
  ;[h[0], h[h.length - 1]] = [h[h.length - 1], h[0]]

  h.pop()

  let index = 0
  let left = leftIndex(index)
  let right = rightIndex(index)
  while (left < h.length) {
    const minIndex = right < h.length && h[right] < h[left] ? right : left
    if (comparator(h[minIndex], h[index]) > 0) {
      ;[h[minIndex], h[index]] = [h[index], h[minIndex]] // eslint-disable-line no-extra-semi

      index = minIndex
      left = leftIndex(index)
      right = rightIndex(index)
    } else {
      break
    }
  }

  return h
}

export function left(index, heap) {
  return heap[leftIndex(index)]
}

export function leftIndex(index) {
  return 2 * index + 1
}

export function right(index, heap) {
  return heap[rightIndex(index)]
}

export function rightIndex(index) {
  return 2 * index + 2
}

export function parent(index, heap) {
  return heap[parentIndex(index)]
}

export function parentIndex(index) {
  return Math.floor((index - 1) / 2)
}
