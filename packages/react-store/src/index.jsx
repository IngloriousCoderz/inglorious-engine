import { sendAction } from "@inglorious/store/client/dev-tools"
import { useCallback } from "react"
import { Provider, useSelector } from "react-redux"

const DEFAULT_CONFIG = { mode: "eager" }
const ONE_SECOND = 1000
const DEFAULT_FPS = 20

export function createReactStore(store, config = DEFAULT_CONFIG) {
  if (config.mode === "batched") {
    loop(store, config)
  }

  return { Provider: StoreProvider, useSelector, useNotify }

  function StoreProvider({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  function useNotify() {
    return useCallback((type, payload) => {
      store.notify(type, payload)

      if (config.mode === "eager") {
        sendAction({ type, payload }, store.getState())
      }
    }, [])
  }
}

function loop(store, config) {
  const fps = config.fps ?? DEFAULT_FPS

  setInterval(() => {
    const processedEvents = store.update()
    const skippedEvents = config.skippedEvents ?? []

    const eventsToLog = processedEvents.filter(
      ({ type }) => !skippedEvents.includes(type),
    )
    if (eventsToLog.length) {
      const action = {
        type: eventsToLog.map(({ type }) => type).join("|"),
        payload: eventsToLog,
      }
      sendAction(action, store.getState())
    }
  }, ONE_SECOND / fps)
}
