export const ACTION_BLACKLIST = [
  "update",
  "gamepadAxis",
  "gamepadPress",
  "gamepadRelease",
  "keyboardKeyDown",
  "keyboardKeyUp",
  "inputAxis",
  "inputPress",
  "inputRelease",
  "mouseMove",
  "mouseClick",
  "spriteAnimationEnd",
]

let devToolsInstance = null

export function initDevTools(store) {
  if (typeof window === "undefined" || !window.__REDUX_DEVTOOLS_EXTENSION__) {
    return
  }

  devToolsInstance = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
    name: "Inglorious Engine",
    predicate: (state, action) => !ACTION_BLACKLIST.includes(action.type),
  })

  devToolsInstance.subscribe((message) => {
    if (message.type !== "DISPATCH") {
      return
    }

    switch (message.payload.type) {
      // reset button
      case "RESET": {
        store.reset()
        devToolsInstance.init(store.getState())
        break
      }

      // revert button
      case "ROLLBACK": {
        const newState = JSON.parse(message.state)
        store.setState(newState)
        break
      }

      // commit button
      case "COMMIT": {
        devToolsInstance.init(store.getState())
        break
      }
    }
  })

  devToolsInstance.init(store.getState())
}

export function sendAction(action, state) {
  if (devToolsInstance) {
    devToolsInstance.send(action, state)
  }
}
