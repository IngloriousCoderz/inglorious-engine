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
  maxJumps: 1,
}
const FALLING = 0

export function enableJump(params) {
  params = extend(DEFAULT_PARAMS, params)

  const freeFall = createFreeFall(params)

  return enableFsm({
    [params.onState]: {
      "game:update"(instance, dt, options) {
        freeFall(instance, dt, options)
      },

      "input:press": handleInput,
    },

    jumping: {
      "game:update"(instance, dt, options) {
        freeFall(instance, dt, options)

        const [x, y, z] = instance.position
        const [, vy] = instance.velocity
        const py = y + vy * dt
        merge(instance, { position: [x, py, z] })
      },

      "input:press": handleInput,
    },
  })
}

function handleInput(instance, { id, action }) {
  if (
    id.endsWith(instance.onInput) &&
    action === "jump" &&
    instance.jumpsLeft
  ) {
    instance.vy = jump(instance)
    instance.state = "jumping"
    instance.groundObject = undefined
    instance.jumpsLeft--
  }
}

function createFreeFall(params) {
  return (instance, dt, { instances }) => {
    instance.onInput = instance.onInput ?? params.onInput
    instance.maxJump = instance.maxJump ?? params.maxJump
    instance.maxLeap = instance.maxLeap ?? params.maxLeap
    instance.maxSpeed = instance.maxSpeed ?? params.maxSpeed
    instance.maxJumps = instance.maxJumps ?? params.maxJumps

    merge(instance, applyGravity(instance, dt))

    const targets = Object.values(instances).filter(
      ({ type }) => type === "platform",
    )

    targets.forEach((target) => {
      if (instance.vy < FALLING && collidesWith(instance, target, "platform")) {
        instance.vy = 0
        const [x, , z] = instance.position
        const py = CalculatePY[instance.collisions.platform.shape](
          instance,
          target,
          "platform",
        )
        instance.position = [x, py, z]
        instance.state = params.onState
        instance.groundObject = target
        instance.jumpsLeft = instance.maxJumps || DEFAULT_PARAMS.maxJumps
      }
    })
  }
}

const CalculatePY = {
  circle: calculatePYForCircle,
  rectangle: calculatePYForRectangle,
}

function calculatePYForCircle(instance, target, collisionGroup = "hitbox") {
  const radius = instance.collisions[collisionGroup].radius ?? instance.radius
  const [, targetY] = target.position
  return targetY + radius
}

function calculatePYForRectangle(instance, target, collisionGroup = "hitbox") {
  const [, targetHeight] = target.collisions[collisionGroup].size ?? target.size
  const [, targetY] = target.position
  return targetY + targetHeight
}
