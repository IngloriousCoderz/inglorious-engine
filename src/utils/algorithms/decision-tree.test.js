import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { expect, test } from "vitest"

import { decide } from "./decision-tree.js"

test("it should make a decision based on a binary decision tree", () => {
  const instance = { state: "sleeping", position: [0, 0, 0] }
  const target = { position: [10, 0, 0] }
  const tree = {
    test({ instance }) {
      return instance.state === "idle"
    },
    true() {
      return {
        test({ instance, target }) {
          const distance = length(subtract(target.position, instance.position))
          return distance < 250
        },
        true() {
          return "aware"
        },
      }
    },
    false() {
      return {
        test({ instance }) {
          return instance.state === "chasing"
        },
        true() {
          return {
            test({ instance, target }) {
              const distance = length(
                subtract(target.position, instance.position),
              )
              return distance >= 250
            },
            true() {
              return "idle"
            },
            false() {
              return {
                test({ instance, target }) {
                  const distance = length(
                    subtract(target.position, instance.position),
                  )
                  return distance < 10
                },
                true() {
                  return "sleepy"
                },
              }
            },
          }
        },
        false() {
          return {
            test({ instance }) {
              return ["sleepy", "sleeping"].includes(instance.state)
            },
            true() {
              return {
                test({ instance, target }) {
                  const distance = length(
                    subtract(target.position, instance.position),
                  )
                  return distance >= 10
                },
                true() {
                  return "aware"
                },
              }
            },
          }
        },
      }
    },
  }

  const state = decide(tree, { instance, target })

  expect(state).toBe("aware")
})

test("it should make a decision on a multi-child tree", () => {
  const instance = { state: "sleeping", position: [0, 0, 0] }
  const target = { position: [10, 0, 0] }
  const wakeUp = () => ({
    test({ instance, target }) {
      const distance = length(subtract(target.position, instance.position))
      return distance >= 10
    },
    true() {
      return "aware"
    },
    false({ instance }) {
      return instance.state
    },
  })

  const tree = {
    test({ instance }) {
      return instance.state
    },
    idle() {
      return {
        test({ instance, target }) {
          const distance = length(subtract(target.position, instance.position))
          return distance < 250
        },
        true() {
          return "aware"
        },
        false({ instance }) {
          return instance.state
        },
      }
    },
    chasing() {
      return {
        test({ instance, target }) {
          const distance = length(subtract(target.position, instance.position))
          return distance >= 250
        },
        true() {
          return "idle"
        },
        false() {
          return {
            test({ instance, target }) {
              const distance = length(
                subtract(target.position, instance.position),
              )
              return distance < 10
            },
            true() {
              return "sleepy"
            },
            false({ instance }) {
              return instance.state
            },
          }
        },
      }
    },
    sleepy: wakeUp,
    sleeping: wakeUp,
  }

  const state = decide(tree, { instance, target })

  expect(state).toBe("aware")
})
