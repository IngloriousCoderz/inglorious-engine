import { renderText } from "@inglorious/renderer-2d/text"

const PlayerName = {
  player1: "Player 1",
  player2: "Player 2",
}

export const text = [
  {
    render: renderText,

    start(entity) {
      entity.value = "Welcome to Pong!\nPress Spacebar to begin!"
    },

    serve(entity, servingPlayer) {
      entity.value = `${PlayerName[servingPlayer]}'s serve!\nPress Spacebar to serve!`
    },

    play(entity) {
      entity.value = ""
    },

    winner(entity, winningPlayer) {
      entity.value = `${PlayerName[winningPlayer]} wins!\nPress Spacebar to restart!`
    },
  },
]
