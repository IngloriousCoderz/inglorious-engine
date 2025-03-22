import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { expect, test } from "vitest"

import { decide } from "./decision-tree.js"

test("it should make a decision based on a binary decision tree", () => {
  const instance = { state: "sleeping", position: [0, 0, 0] }
  const target = { position: [10, 0, 0] }
  const tree = {
    test: ({ instance }) => instance.state === "idle",
    true: () => ({
      test: ({ instance, mouse }) => {
        const distance = length(subtract(mouse.position, instance.position))
        return distance < 250
      },
      true: () => "aware",
    }),
    false: () => ({
      test: ({ instance }) => instance.state === "chasing",
      true: () => ({
        test: ({ instance, mouse }) => {
          const distance = length(subtract(mouse.position, instance.position))
          return distance >= 250
        },
        true: () => "idle",
        false: () => ({
          test: ({ instance, mouse }) => {
            const distance = length(subtract(mouse.position, instance.position))
            return distance < 10
          },
          true: () => "sleepy",
        }),
      }),
      false: () => ({
        test: ({ instance }) => ["sleepy", "sleeping"].includes(instance.state),
        true: () => ({
          test: ({ instance, mouse }) => {
            const distance = length(subtract(mouse.position, instance.position))
            return distance >= 10
          },
          true: () => "aware",
        }),
      }),
    }),
  }

  const state = decide(tree, { instance, mouse: target })

  expect(state).toBe("aware")
})

test("it should make a decision on a multi-child tree", () => {
  const instance = { state: "sleeping", position: [0, 0, 0] }
  const target = { position: [10, 0, 0] }
  const tree = {
    test: ({ instance }) => instance.state,
    idle: () => ({
      test: ({ instance, target }) => {
        const distance = length(subtract(target.position, instance.position))
        return distance < 250
      },
      true: () => "aware",
      false: ({ instance }) => instance.state,
    }),
    chasing: () => ({
      test: ({ instance, target }) => {
        const distance = length(subtract(target.position, instance.position))
        return distance >= 250
      },
      true: () => "idle",
      false: () => ({
        test: ({ instance, target }) => {
          const distance = length(subtract(target.position, instance.position))
          return distance < 10
        },
        true: () => "sleepy",
        false: ({ instance }) => instance.state,
      }),
    }),
    sleepy: () => ({
      test: ({ instance, target }) => {
        const distance = length(subtract(target.position, instance.position))
        return distance >= 10
      },
      true: () => "aware",
      false: ({ instance }) => instance.state,
    }),
    sleeping: () => ({
      test: ({ instance, target }) => {
        const distance = length(subtract(target.position, instance.position))
        return distance >= 10
      },
      true: () => "aware",
      false: ({ instance }) => instance.state,
    }),
  }

  const state = decide(tree, { instance, target })

  expect(state).toBe("aware")
})
