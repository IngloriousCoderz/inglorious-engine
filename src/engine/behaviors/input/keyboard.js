const DEFAULT_PARAMS = {
  name: "keyboard0",
}

export function keyboard() {
  let handleKeyDown, handleKeyUp

  return {
    start(entity, event, api) {
      handleKeyDown = createKeyboardHandler("keyboardKeyDown", api)
      handleKeyUp = createKeyboardHandler("keyboardKeyUp", api)

      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("keyup", handleKeyUp)
    },

    stop() {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    },

    keyboardKeyDown(entity, keyCode, api) {
      const action = entity.mapping[keyCode]
      if (!entity[action]) {
        entity[action] = true
        api.notify("inputPress", { id: entity.id, action })
      }
    },

    keyboardKeyUp(entity, keyCode, api) {
      const action = entity.mapping[keyCode]
      if (entity[action]) {
        entity[action] = false
        api.notify("inputRelease", { id: entity.id, action })
      }
    },
  }
}

export function createKeyboard(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "keyboard", mapping }
}

function createKeyboardHandler(id, api) {
  return (event) => {
    event.stopPropagation()
    api.notify(id, event.code)
  }
}
