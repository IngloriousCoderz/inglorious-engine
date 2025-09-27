import { renderText } from "@inglorious/renderer-2d/text"
import { extend } from "@inglorious/utils/data-structures/objects"

export const score = [
  { render: renderText },
  (type) =>
    extend(type, {
      playerScore(entity, entityId) {
        entity[entityId]++
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        entity.value = `${entity.player1} - ${entity.player2}`
      },
    }),
]
