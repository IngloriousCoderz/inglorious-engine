import { findCollision } from "@inglorious/engine/collision/detection.js"
import { calculateLandingPosition } from "@inglorious/engine/physics/position.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"
import { applyGravity } from "@inglorious/utils/physics/gravity.js"
import { jump } from "@inglorious/utils/physics/jump.js"

const DEFAULT_PARAMS = {
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
      start(entity, api) {
        type.start?.(entity, api)

        entity.maxSpeed = entity.maxSpeed ?? params.maxSpeed
        entity.maxJump = entity.maxJump ?? params.maxJump
        entity.maxLeap = entity.maxLeap ?? params.maxLeap
        entity.maxJumps = entity.maxJumps ?? params.maxJumps
        entity.jumpsLeft = entity.jumpsLeft ?? entity.maxJumps
      },

      jump(entity, { entityId }) {
        if (entityId === entity.id && entity.jumpsLeft) {
          entity.vy = jump(entity)
          entity.groundObject = undefined
          entity.jumpsLeft--
        }
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        merge(entity, applyGravity(entity, dt))

        if (entity.vy < FALLING) {
          const entities = api.getEntities()
          const target = findCollision(entity, entities, "platform")

          if (!target) return

          entity.vy = 0
          const py = calculateLandingPosition(entity, target, "platform")

          const [x, , z] = entity.position
          entity.position = [x, py, z]
          entity.groundObject = target
          entity.jumpsLeft = entity.maxJumps
          api.notify("landed", { entityId: entity.id, targetId: target.id })
        }
      },
    })
}
