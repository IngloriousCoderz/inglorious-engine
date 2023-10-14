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
  let parent = parentIndex(index)

  while (index > 0 && comparator(h[index], h[parent]) > 0) {
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
  let newMinFound = false

  while (left < h.length && !newMinFound) {
    const minIndex = right < h.length && h[right] < h[left] ? right : left
    newMinFound = comparator(h[minIndex], h[index]) > 0

    if (newMinFound) {
      ;[h[minIndex], h[index]] = [h[index], h[minIndex]] // eslint-disable-line no-extra-semi

      index = minIndex
      left = leftIndex(index)
      right = rightIndex(index)
    }
  }

  return h
}

export function remove(heap) {
  const [, ...rest] = heap
  return heapify([...rest.slice(-1), ...rest.slice(0, -1)])
}

// function left(index, heap) {
//   return heap[leftIndex(index)]
// }

function leftIndex(index) {
  return 2 * index + 1
}

// function right(index, heap) {
//   return heap[rightIndex(index)]
// }

function rightIndex(index) {
  return 2 * index + 2
}

// function parent(index, heap) {
//   return heap[parentIndex(index)]
// }

function parentIndex(index) {
  return Math.floor((index - 1) / 2)
}
