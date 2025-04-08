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
const Y = 1

export function enableDoubleJump(params) {
  params = extend(DEFAULT_PARAMS, params)

  const freeFall = createFreeFall(params)

  return enableFsm({
    jumping: {
      "input:press"(instance, event, options) {
        instance.onInput = instance.onInput ?? params.onInput
        instance.maxJump = instance.maxJump ?? params.maxJump
        instance.maxLeap = instance.maxLeap ?? params.maxLeap
        instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed

        const { id, action } = event.payload
        if (id.endsWith(instance.onInput) && action === "jump") {
          instance.state = "doubleJumping"
          merge(instance, jump(instance, options))
        }
      },
    },

    doubleJumping: {
      "game:update"(instance, event, options) {
        freeFall(instance, event, options)
      },
    },
  })
}

// TODO: this is a copy-paste of jump.js. Can we reduce duplication?
function createFreeFall(params) {
  return (instance, event, options) => {
    instance.maxLeap = instance.maxLeap ?? params.maxLeap

    merge(instance, applyGravity(instance, options))

    const { instances } = options
    const targets = Object.values(instances).filter(
      ({ type }) => type === "platform",
    )

    targets.forEach((target) => {
      if (instance.vy < FALLING && collidesWith(instance, target, "platform")) {
        instance.vy = 0
        instance.py = 0
        instance.position[Y] =
          target.position[Y] + instance.collisions.platform.radius
        instance.state = params.onState
      }
    })
  }
}
