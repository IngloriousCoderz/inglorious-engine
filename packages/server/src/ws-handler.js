/**
 * Sets up WebSocket event handling for a given server and store.
 * @param {object} wss The WebSocket server instance.
 * @param {object} store The game store instance.
 * @param {Set<object>} clients A Set to keep track of all connected clients.
 * @param {object} logger A Pino logger instance.
 */
export function setup(wss, store, clients, logger) {
  // Listen for new client connections.
  wss.on("connection", (ws) => {
    logger.info("A new client has connected.")
    clients.add(ws)

    // Send the initial state to the new client.
    ws.send(JSON.stringify({ type: "initialState", payload: store.getState() }))

    // Listen for messages from the client.
    ws.on("message", (message) => {
      try {
        // Parse the incoming event.
        const event = JSON.parse(message)

        // Dispatch the event to the central store.
        store.dispatch(event)

        // Broadcast the event to all other clients.
        const eventMessage = JSON.stringify(event)
        for (const client of clients) {
          if (client !== ws) {
            // Exclude the sender from the broadcast.
            client.send(eventMessage)
          }
        }
      } catch (error) {
        logger.error("Failed to parse message:", error)
      }
    })

    // Listen for the client disconnecting.
    ws.on("close", () => {
      logger.info("A client has disconnected.")
      clients.delete(ws)
    })

    ws.on("error", (error) => {
      logger.error("WebSocket error:", error)
    })
  })
}
