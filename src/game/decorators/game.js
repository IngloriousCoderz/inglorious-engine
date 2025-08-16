export function enableGame() {
  return {
    "keyboard:keyUp"(instance, code) {
      if (code === "KeyC") {
        instance.debug = !instance.debug
      }
    },
  }
}
