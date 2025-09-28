import { extend } from "@inglorious/utils/data-structures/objects"

export const game = [
  (type) =>
    extend(type, {
      action(entity, _, api) {
        switch (entity.state) {
          case "start":
            entity.state = "serve"
            break

          case "serve":
            entity.state = "play"
            api.notify("reset")
            break
        }
      },

      playerScore(entity, entityId) {
        entity.state = "serve"

        switch (entityId) {
          case "player1":
            entity.servingPlayer = "player2"
            break

          case "player2":
            entity.servingPlayer = "player1"
            break
        }
      },
    }),
]
