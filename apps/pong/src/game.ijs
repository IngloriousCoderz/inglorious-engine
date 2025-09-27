import { paddle } from "./types/paddle.ijs"

export default {
  types: { paddle },
  entities: {
    player1: {
      type: "paddle",
      position: v(0, 0, 0),
      size: v(20, 100, 0),
    },
    player2: {
      type: "paddle",
      position: v(760, 0, 0),
      size: v(20, 100, 0),
    },
  },
}
