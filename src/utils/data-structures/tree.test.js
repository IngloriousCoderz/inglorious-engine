import { expect, test } from 'vitest'

import { bfs, dfs } from './tree'

test('it should perform Breadth-First Search on a tree', () => {
  const tree = {
    value: 1,
    children: [
      { value: 2, children: [{ value: 4 }, { value: 5 }] },
      { value: 3, children: [{ value: 6 }, { value: 7 }] },
    ],
  }
  const expectedResult = [1, 2, 3, 4, 5, 6, 7]

  const result = bfs(tree)

  expect(result).toStrictEqual(expectedResult)
})

test('it should perform Depth-First Search on a tree', () => {
  const tree = {
    value: 1,
    children: [
      { value: 2, children: [{ value: 3 }, { value: 4 }] },
      { value: 5, children: [{ value: 6 }, { value: 7 }] },
    ],
  }
  const expectedResult = [1, 2, 3, 4, 5, 6, 7]

  const result = dfs(tree)

  expect(result).toStrictEqual(expectedResult)
})
