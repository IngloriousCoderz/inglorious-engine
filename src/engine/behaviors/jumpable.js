import { findCollision } from "@inglorious/engine/collision/detection.js"
import { calculateLandingPosition } from "@inglorious/engine/physics/position.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { applyGravity } from "@inglorious/utils/physics/gravity.js"
import { jump } from "@inglorious/utils/physics/jump.js"

const DEFAULT_PARAMS = {
  onInput: "input0",
  maxSpeed: 250,
  maxJump: 100,
  maxLeap: 100,
  maxJumps: 1,
}
const FALLING = 0

export function jumpable(params) {
  params = extend(DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      start: handleStart(type, params),
      jump: handleJump,
      update: handleUpdate(type),
    })
}

function handleStart(type, params) {
  return (entity) => {
    type.start?.(entity)

    entity.onInput = entity.onInput ?? params.onInput
    entity.maxJump = entity.maxJump ?? params.maxJump
    entity.maxLeap = entity.maxLeap ?? params.maxLeap
    entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed
    entity.maxJumps = entity.maxJumps ?? params.maxJumps
    entity.jumpsLeft = entity.jumpsLeft ?? entity.maxJumps
  }
}

function handleJump(entity, { inputId }) {
  if (inputId === entity.onInput && entity.jumpsLeft) {
    entity.vy = jump(entity)
    entity.groundObject = undefined
    entity.jumpsLeft--
  }
}

function handleUpdate(type) {
  return (entity, dt, api) => {
    type.update?.(entity, dt, api)

    merge(entity, applyGravity(entity, dt))

    if (entity.vy < FALLING) {
      const entities = api.getEntities()
      const target = findCollision(entity, entities, "platform")

      if (target) {
        entity.vy = 0
        const [x, , z] = entity.position
        const py = calculateLandingPosition(entity, target, "platform")
        entity.position = [x, py, z]
        entity.groundObject = target
        entity.jumpsLeft = entity.maxJumps
      }
    }
  }
}
