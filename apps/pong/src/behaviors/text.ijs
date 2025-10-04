import { renderText } from "@inglorious/renderer-2d/text"

const PlayerName = {
  player1: "Player 1",
  player2: "Player 2",
}

export const text = {
  render: renderText,

  start(entity, _, { getEntity }) {
    const { isMobile } = getEntity("game")
    const actionText = isMobile ? "Tap the ball" : "Press Spacebar"
    entity.value = `Welcome to Pong!\n${actionText} to begin!`
  },

  serve(entity, servingPlayer, { getEntity }) {
    const { isMobile } = getEntity("game")
    const actionText = isMobile ? "Tap the ball" : "Press Spacebar"
    entity.value = `${PlayerName[servingPlayer]}'s serve!\n${actionText} to serve!`
  },

  play(entity) {
    entity.value = ""
  },

  winner(entity, winningPlayer, { getEntity }) {
    const { isMobile } = getEntity("game")
    const actionText = isMobile ? "Tap the ball" : "Press Spacebar"
    entity.value = `${PlayerName[winningPlayer]} wins!\n${actionText} to restart!`
  },
}
