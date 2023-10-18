import { length } from '@inglorious/utils/math/linear-algebra/vector'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'
import { expect, test } from 'vitest'

import { decide } from './decision-tree'

test('it should make a decision based on the current state', () => {
  const instance = { state: 'sleeping', position: [0, 0, 0] }
  const mouse = { position: [10, 0, 0] }
  const tree = {
    test: ({ instance }) => instance.state === 'idle',
    true: () => ({
      test: ({ instance, mouse }) => {
        const distance = length(subtract(mouse.position, instance.position))
        return distance < 250
      },
      true: () => 'aware',
    }),
    false: () => ({
      test: ({ instance }) => instance.state === 'chasing',
      true: () => ({
        test: ({ instance, mouse }) => {
          const distance = length(subtract(mouse.position, instance.position))
          return distance >= 250
        },
        true: () => 'idle',
        false: () => ({
          test: ({ instance, mouse }) => {
            const distance = length(subtract(mouse.position, instance.position))
            return distance < 10
          },
          true: () => 'sleepy',
        }),
      }),
      false: () => ({
        test: ({ instance }) => ['sleepy', 'sleeping'].includes(instance.state),
        true: () => ({
          test: ({ instance, mouse }) => {
            const distance = length(subtract(mouse.position, instance.position))
            return distance >= 10
          },
          true: () => 'aware',
        }),
      }),
    }),
  }

  const state = decide(tree, { instance, mouse })

  expect(state).toBe('aware')
})
