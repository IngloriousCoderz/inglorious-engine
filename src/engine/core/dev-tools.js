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

const LAST_STATE = 1

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
    switch (message.type) {
      case "DISPATCH":
        handleDispatch(message, store)
        break

      case "ACTION":
        handleAction(message, store)
        break
    }
  })

  devToolsInstance.init(store.getState())
}

export function sendAction(action, state) {
  if (devToolsInstance) {
    devToolsInstance.send(action, state)
  }
}

function handleDispatch(message, store) {
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

    // import from file button
    case "IMPORT_STATE": {
      const { computedStates, actionsById } = message.payload.nextLiftedState

      const [firstComputedState] = computedStates
      const lastComputedState =
        computedStates[computedStates.length - LAST_STATE]
      if (lastComputedState) {
        store.setState(lastComputedState.state)
      }

      const flattenedActions = Object.values(actionsById)
        .flatMap(({ action }) => action.payload ?? action)
        .map((action, index) => [index, action])

      devToolsInstance.init(
        firstComputedState.state,
        Object.fromEntries(flattenedActions),
      )
      break
    }
  }
}

function handleAction(message, store) {
  const action = JSON.parse(message.payload)
  store.dispatch(action)
}
