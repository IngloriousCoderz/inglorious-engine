import { collidesWith } from "@inglorious/engine/collision/detection.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { applyGravity } from "@inglorious/utils/physics/gravity.js"
import { jump } from "@inglorious/utils/physics/jump.js"

import { fsm } from "./fsm.js"

const DEFAULT_PARAMS = {
  onState: "default",
  onInput: "input0",
  maxSpeed: 250,
  maxJump: 100,
  maxLeap: 100,
  maxJumps: 1,
}
const FALLING = 0

export function jumpable(params) {
  params = extend(DEFAULT_PARAMS, params)

  const freeFall = createFreeFall(params)

  return fsm({
    [params.onState]: {
      update(entity, dt, api) {
        freeFall(entity, dt, api)
      },

      inputPress: handleInput,
    },

    jumping: {
      update(entity, dt, api) {
        freeFall(entity, dt, api)

        const [x, y, z] = entity.position
        const [, vy] = entity.velocity
        const py = y + vy * dt
        merge(entity, { position: [x, py, z] })
      },

      inputPress: handleInput,
    },
  })
}

function handleInput(entity, { id, action }) {
  if (id.endsWith(entity.onInput) && action === "jump" && entity.jumpsLeft) {
    entity.vy = jump(entity)
    entity.state = "jumping"
    entity.groundObject = undefined
    entity.jumpsLeft--
  }
}

function createFreeFall(params) {
  return (entity, dt, api) => {
    entity.onInput = entity.onInput ?? params.onInput
    entity.maxJump = entity.maxJump ?? params.maxJump
    entity.maxLeap = entity.maxLeap ?? params.maxLeap
    entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed
    entity.maxJumps = entity.maxJumps ?? params.maxJumps

    merge(entity, applyGravity(entity, dt))

    const entities = api.getEntities()

    const targets = Object.values(entities).filter(
      ({ type }) => type === "platform",
    )

    targets.forEach((target) => {
      if (entity.vy < FALLING && collidesWith(entity, target, "platform")) {
        entity.vy = 0
        const [x, , z] = entity.position
        const py = CalculatePY[entity.collisions.platform.shape](
          entity,
          target,
          "platform",
        )
        entity.position = [x, py, z]
        entity.state = params.onState
        entity.groundObject = target
        entity.jumpsLeft = entity.maxJumps || DEFAULT_PARAMS.maxJumps
      }
    })
  }
}

const CalculatePY = {
  circle: calculatePYForCircle,
  rectangle: calculatePYForRectangle,
}

function calculatePYForCircle(entity, target, collisionGroup = "hitbox") {
  const [, targetHeight] = target.collisions[collisionGroup].size ?? target.size
  const [, targetY] = target.position
  const entityRadius = entity.collisions[collisionGroup].radius ?? entity.radius
  return targetY + targetHeight + entityRadius
}

function calculatePYForRectangle(entity, target, collisionGroup = "hitbox") {
  const [, targetHeight] = target.collisions[collisionGroup].size ?? target.size
  const [, targetY] = target.position
  return targetY + targetHeight
}
