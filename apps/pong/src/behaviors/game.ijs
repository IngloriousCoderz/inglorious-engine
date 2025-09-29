export const game = {
  action(entity, _, api) {
    switch (entity.state) {
      case "start":
        entity.state = "serve"
        entity.servingPlayer = "player1"
        api.notify("serve", entity.servingPlayer)
        break

      case "serve":
        entity.state = "play"
        api.notify("play")
        break

      case "done":
        entity.state = "serve"
        api.notify("reset")
        api.notify("serve", entity.servingPlayer)
        break
    }
  },

  playerScore(entity, scoringPlayer, api) {
    entity.state = "serve"
    entity.servingPlayer = scoringPlayer === "player1" ? "player2" : "player1"
    api.notify("serve", entity.servingPlayer)
  },

  winner(entity, winningPlayer) {
    entity.state = "done"
    entity.servingPlayer = winningPlayer === "player1" ? "player2" : "player1"
  },
}
