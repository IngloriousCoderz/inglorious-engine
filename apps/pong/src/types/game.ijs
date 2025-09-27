import { extend } from "@inglorious/utils/data-structures/objects"

export const game = [
  (type) =>
    extend(type, {
      keyboardKeyUp(entity, keyCode, api) {
        if (keyCode === "Enter") {
          api.notify("reset")
        }
      },
    }),
]
