export function game() {
  return {
    keyboardKeyUp(instance, code) {
      if (code === "KeyC") {
        instance.debug = !instance.debug
      }
    },
  }
}
