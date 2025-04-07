export function enableGame() {
  return {
    "keyboard:keyUp"(instance, event) {
      const code = event.payload

      if (code === "KeyC") {
        instance.debug = !instance.debug
      }
    },
  }
}
