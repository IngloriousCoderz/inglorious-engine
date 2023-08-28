import { expect, test } from 'vitest'

import seek from './seek'

test('it should calculate the steering output for the seek algorithm', () => {
  const character = { position: [0, 0, 0], speed: 10 }
  const target = { position: [3, 0, 4] }

  expect(seek(character, target, { elapsed: 1 })).toStrictEqual({
    position: [6, 0, 8],
    velocity: [6, 0, 8],
    orientation: 0.9272952180016122,
  })
})
