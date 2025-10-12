import { sendAction } from "@inglorious/store/client/dev-tools"
import { Provider as BaseProvider, useDispatch, useSelector } from "react-redux"

const DEFAULT_CONFIG = { mode: "eager" }
const ONE_SECOND = 1000
const DEFAULT_FPS = 30

export function createReactStore(store, config = DEFAULT_CONFIG) {
  if (config.mode === "batched") {
    loop(store, config)
  }

  return { Provider, useSelector, useNotify }

  function Provider({ children }) {
    return <BaseProvider store={store}>{children}</BaseProvider>
  }

  function useNotify() {
    const dispatch = useDispatch()

    return (type, payload) => {
      const action = { type, payload }
      dispatch(action)

      if (config.mode === "eager") {
        store.update()
        sendAction(action, store.getState())
      }
    }
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
