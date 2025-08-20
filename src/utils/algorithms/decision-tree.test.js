import { length } from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { expect, test } from "vitest"

import { decide } from "./decision-tree.js"

test("it should make a decision based on a binary decision tree", () => {
  const entity = { state: "sleeping", position: [0, 0, 0] }
  const target = { position: [10, 0, 0] }
  const tree = {
    test({ entity }) {
      return entity.state === "idle"
    },
    true() {
      return {
        test({ entity, target }) {
          const distance = length(subtract(target.position, entity.position))
          return distance < 250
        },
        true() {
          return "aware"
        },
      }
    },
    false() {
      return {
        test({ entity }) {
          return entity.state === "chasing"
        },
        true() {
          return {
            test({ entity, target }) {
              const distance = length(
                subtract(target.position, entity.position),
              )
              return distance >= 250
            },
            true() {
              return "idle"
            },
            false() {
              return {
                test({ entity, target }) {
                  const distance = length(
                    subtract(target.position, entity.position),
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
            test({ entity }) {
              return ["sleepy", "sleeping"].includes(entity.state)
            },
            true() {
              return {
                test({ entity, target }) {
                  const distance = length(
                    subtract(target.position, entity.position),
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

  const state = decide(tree, { entity, target })

  expect(state).toBe("aware")
})

test("it should make a decision on a multi-child tree", () => {
  const entity = { state: "sleeping", position: [0, 0, 0] }
  const target = { position: [10, 0, 0] }
  const wakeUp = () => ({
    test({ entity, target }) {
      const distance = length(subtract(target.position, entity.position))
      return distance >= 10
    },
    true() {
      return "aware"
    },
    false({ entity }) {
      return entity.state
    },
  })

  const tree = {
    test({ entity }) {
      return entity.state
    },
    idle() {
      return {
        test({ entity, target }) {
          const distance = length(subtract(target.position, entity.position))
          return distance < 250
        },
        true() {
          return "aware"
        },
        false({ entity }) {
          return entity.state
        },
      }
    },
    chasing() {
      return {
        test({ entity, target }) {
          const distance = length(subtract(target.position, entity.position))
          return distance >= 250
        },
        true() {
          return "idle"
        },
        false() {
          return {
            test({ entity, target }) {
              const distance = length(
                subtract(target.position, entity.position),
              )
              return distance < 10
            },
            true() {
              return "sleepy"
            },
            false({ entity }) {
              return entity.state
            },
          }
        },
      }
    },
    sleepy: wakeUp,
    sleeping: wakeUp,
  }

  const state = decide(tree, { entity, target })

  expect(state).toBe("aware")
})
