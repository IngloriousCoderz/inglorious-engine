import { renderText } from "@inglorious/renderer-2d/text"

const WINNING_SCORE = 10

export const score = [
  {
    render: renderText,

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

    update(entity) {
      entity.value = `${entity.player1} - ${entity.player2}`
    },
  },
]
