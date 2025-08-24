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
    actionCreators: {
      jump: () => ({ type: "jump", payload: { inputId: "input0" } }),
    },
    // @see https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md#features
    features: {
      pause: true, // start/pause recording of dispatched actions
      lock: true, // lock/unlock dispatching actions and side effects
      persist: true, // persist states on page reloading
      export: true, // export history of actions in a file
      import: "custom", // import history of actions from a file
      jump: false, // jump back and forth (time travelling)
      skip: false, // skip (cancel) actions
      reorder: false, // drag and drop actions in the history list
      dispatch: true, // dispatch custom actions or action creators
      test: false, // generate tests for the selected actions
    },
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
