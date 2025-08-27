import { arrive } from "@inglorious/engine/ai/movement/dynamic/arrive.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export function camera() {
  return {
    update(entity, dt, api) {
      if (!entity.targetId) {
        return
      }

      const target = api.getEntity(entity.targetId)

      if (target) {
        // The camera will "arrive" at the target's position.
        // You can tweak the parameters in the entity definition
        // to change how the camera follows the target.
        merge(entity, arrive(entity, target, dt))
      }
    },
  }
}
