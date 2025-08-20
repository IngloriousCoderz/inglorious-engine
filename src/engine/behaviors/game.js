export function game() {
  return {
    keyboardKeyUp(entity, code) {
      if (code === "KeyC") {
        entity.debug = !entity.debug
      }
    },
  }
}
