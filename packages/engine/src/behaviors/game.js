export function game() {
  return {
    pause(entity) {
      entity.paused = true
    },

    resume(entity) {
      entity.paused = false
    },

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
