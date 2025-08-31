export function game() {
  return {
    keyboardKeyUp(entity, code) {
      switch (code) {
        case "KeyC":
          entity.debug = !entity.debug
          break

        case "KeyD":
          entity.devMode = !entity.devMode
          break
      }
    },
  }
}
