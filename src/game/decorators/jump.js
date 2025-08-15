import { collidesWith } from "@inglorious/engine/collision/detection.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { applyGravity } from "@inglorious/utils/physics/gravity.js"
import { jump } from "@inglorious/utils/physics/jump.js"

import { enableFsm } from "./fsm.js"

const DEFAULT_PARAMS = {
  onState: "default",
  onInput: "input0",
  maxSpeed: 250,
  maxJump: 100,
  maxLeap: 100,
}
const FALLING = 0

export function enableJump(params) {
  params = extend(DEFAULT_PARAMS, params)

  const freeFall = createFreeFall(params)

  return enableFsm({
    [params.onState]: {
      "game:update"(instance, event, options) {
        freeFall(instance, event, options)
      },

      "input:press"(instance, event, options) {
        instance.onInput = instance.onInput ?? params.onInput
        instance.maxJump = instance.maxJump ?? params.maxJump
        instance.maxLeap = instance.maxLeap ?? params.maxLeap
        instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

        const { id, action } = event.payload
        if (id.endsWith(instance.onInput) && action === "jump") {
          instance.state = "jumping"
          merge(instance, jump(instance, options))
        }
      },
    },

    jumping: {
      "game:update"(instance, event, options) {
        freeFall(instance, event, options)
      },
    },
  })
}

function createFreeFall(params) {
  return (instance, event, options) => {
    instance.maxLeap = instance.maxLeap ?? params.maxLeap

    merge(instance, applyGravity(instance, options))

    const targets = Object.values(options.instances).filter(
      ({ type }) => type === "platform",
    )

    targets.forEach((target) => {
      if (instance.vy < FALLING && collidesWith(instance, target, "platform")) {
        instance.vy = 0
        const [x, , z] = instance.position
        const { radius } = instance.collisions.platform
        const [, targetY] = target.position
        const py = targetY + radius
        instance.position = [x, py, z]
        instance.state = params.onState
      }
    })
  }
}
