const DEFAULT_PARAMS = {
  name: "keyboard0",
}

export function keyboard() {
  let handleKeyDown, handleKeyUp

  return {
    start(instance, event, options) {
      handleKeyDown = createKeyboardHandler("keyboardKeyDown", options)
      handleKeyUp = createKeyboardHandler("keyboardKeyUp", options)

      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("keyup", handleKeyUp)
    },

    stop() {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    },

    keyboardKeyDown(instance, keyCode, { notify }) {
      const action = instance.mapping[keyCode]
      if (!instance[action]) {
        instance[action] = true
        notify("inputPress", { id: instance.id, action })
      }
    },

    keyboardKeyUp(instance, keyCode, { notify }) {
      const action = instance.mapping[keyCode]
      if (instance[action]) {
        instance[action] = false
        notify("inputRelease", { id: instance.id, action })
      }
    },
  }
}

export function createKeyboard(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "keyboard", mapping }
}

function createKeyboardHandler(id, { notify }) {
  return (event) => {
    event.stopPropagation()
    notify(id, event.code)
  }
}
