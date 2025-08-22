const ACTION_BLACKLIST = ["update", "mouseMove", "spriteAnimationEnd"]

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
    if (
      message.type === "DISPATCH" &&
      message.payload.type === "JUMP_TO_STATE"
    ) {
      const newState = JSON.parse(message.state)
      store.setState(newState)
    }
  })

  devToolsInstance.init(store.getState())
}

export function sendAction(action, state) {
  if (devToolsInstance) {
    devToolsInstance.send(action, state)
  }
}
