const DEFAULT_PARAMS = {
  name: "keyboard0",
}

export function enableKeyboard() {
  let handleKeyDown, handleKeyUp

  return {
    "game:start"(instance, event, options) {
      handleKeyDown = createKeyboardHandler("keyboard:keyDown", options)
      handleKeyUp = createKeyboardHandler("keyboard:keyUp", options)

      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("keyup", handleKeyUp)
    },

    "game:stop"() {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    },

    "keyboard:keyDown"(instance, keyCode, { notify }) {
      const action = instance.mapping[keyCode]
      if (!instance[action]) {
        instance[action] = true
        notify({ id: "input:press", payload: { id: instance.id, action } })
      }
    },

    "keyboard:keyUp"(instance, keyCode, { notify }) {
      const action = instance.mapping[keyCode]
      if (instance[action]) {
        instance[action] = false
        notify({ id: "input:release", payload: { id: instance.id, action } })
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
    notify({ id, payload: event.code })
  }
}
