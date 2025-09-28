import { renderText } from "@inglorious/renderer-2d/text"
import { extend } from "@inglorious/utils/data-structures/objects"

const WINNING_SCORE = 3

export const score = [
  { render: renderText },
  (type) =>
    extend(type, {
      reset(entity) {
        entity.player1 = 0
        entity.player2 = 0
      },

      playerScore(entity, scoringPlayer, api) {
        entity[scoringPlayer]++

        if (entity[scoringPlayer] >= WINNING_SCORE) {
          api.notify("winner", scoringPlayer)
        }
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        entity.value = `${entity.player1} - ${entity.player2}`
      },
    }),
]
