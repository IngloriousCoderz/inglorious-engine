import { extend } from "@inglorious/utils/data-structures/objects.js"

import { coreEvents } from "../core-events.js"

// A constant for the server's WebSocket URL.
const DEFAULT_SERVER_URL = `ws://${window.location.hostname}:3000`
const DEFAULT_RECONNECTION_DELAY = 1000

/**
 * Creates and returns the multiplayer middleware.
 * @returns {Function} The middleware function.
 */
export function multiplayerMiddleware(config = {}) {
  const serverUrl = config.serverUrl ?? DEFAULT_SERVER_URL
  const reconnectionDelay =
    config.reconnectionDelay ?? DEFAULT_RECONNECTION_DELAY

  let ws = null
  const localQueue = []

  // The middleware function that will be applied to the store.
  return (store) => (next) => (event) => {
    if (coreEvents.includes(event.type)) {
      return next(event)
    }

    // Establish the connection on the first event.
    if (!ws) {
      establishConnection(store)
    }

    // Only send the event to the server if it didn't come from the server.
    if (!event.fromServer) {
      if (ws?.readyState === WebSocket.OPEN) {
        // If the connection is open, send the event immediately.
        ws.send(JSON.stringify(event))
      } else {
        // If the connection is not open, queue the event for later.
        localQueue.push(event)
      }
    }

    // Pass the event to the next middleware in the chain,
    // which is eventually the store's original dispatch function.
    return next(event)
  }

  /**
   * Attempts to establish a WebSocket connection to the server.
   */
  function establishConnection(store) {
    // If a connection already exists, close it first.
    if (ws) {
      ws.close()
    }
    ws = new WebSocket(serverUrl)

    // =====================================================================
    // WebSocket Event Handlers
    // =====================================================================

    ws.onopen = () => {
      // Send any queued events to the server.
      while (localQueue.length) {
        ws.send(JSON.stringify(localQueue.shift()))
      }
    }

    ws.onmessage = (event) => {
      const serverEvent = JSON.parse(event.data)

      if (serverEvent.type === "initialState") {
        // Merge the server's initial state with the client's local state.
        const nextState = extend(store.getState(), serverEvent.payload)
        store.setState(nextState)
      } else {
        // Dispatch the event to the local store to update the client's state.
        store.dispatch({ ...serverEvent, fromServer: true })
      }
    }

    ws.onclose = () => {
      // Attempt to reconnect after a short delay.
      setTimeout(() => establishConnection(store), reconnectionDelay)
    }

    ws.onerror = () => {
      ws.close() // The 'onclose' handler will trigger the reconnect.
    }
  }
}
