import { scale } from "@inglorious/utils/math/vector.js"
import { mod, sum } from "@inglorious/utils/math/vectors.js"

export function infiniteScroll() {
  return {
    update(entity, dt) {
      entity.position = mod(
        sum(entity.position, scale(entity.velocity, dt)),
        entity.image.loop,
      )
    },
  }
}
