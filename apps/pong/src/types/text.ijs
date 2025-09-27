import { renderText } from "@inglorious/renderer-2d/text"

const PlayerName = {
  player1: "Player 1",
  player2: "Player 2",
}

export const text = [
  { render: renderText },
  {
    update(entity, dt, api) {
      const game = api.getEntity("game")

      switch (game.state) {
        case "start":
          entity.value = "Welcome to Pong!\nPress Enter to begin!"
          break

        case "serve":
          entity.value = `${PlayerName[game.servingPlayer]}'s serve!\nPress Enter to serve!`
          break

        case "play":
          entity.value = ""
          break
      }
    },
  },
]
