const DEFAULT_PARAMS = {
  name: "keyboard0",
}

export function keyboard() {
  let handleKeyDown, handleKeyUp
  let currentDocument = null

  return {
    start(_, api) {
      currentDocument = document.body.ownerDocument || document

      handleKeyDown = createKeyboardHandler("keyboardKeyDown", api)
      handleKeyUp = createKeyboardHandler("keyboardKeyUp", api)

      currentDocument.addEventListener("keydown", handleKeyDown)
      currentDocument.addEventListener("keyup", handleKeyUp)
    },

    stop() {
      currentDocument.removeEventListener("keydown", handleKeyDown)
      currentDocument.removeEventListener("keyup", handleKeyUp)
    },

    keyboardKeyDown(entity, keyCode, api) {
      const action = entity.mapping[keyCode]
      if (!action) {
        return
      }

      if (!entity[action]) {
        entity[action] = true
        api.notify("inputPress", { controlId: entity.id, action })
      }
    },

    keyboardKeyUp(entity, keyCode, api) {
      const action = entity.mapping[keyCode]
      if (!action) {
        return
      }

      if (entity[action]) {
        entity[action] = false
        api.notify("inputRelease", { controlId: entity.id, action })
      }
    },
  }
}

export function createKeyboard(
  name = DEFAULT_PARAMS.name,
  targetInput,
  mapping = {},
) {
  return { id: name, type: "keyboard", targetInput, mapping }
}

function createKeyboardHandler(id, api) {
  return (event) => {
    event.stopPropagation()
    api.notify(id, event.code)
  }
}
