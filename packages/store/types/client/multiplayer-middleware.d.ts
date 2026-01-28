import type { BaseEntity, EntitiesState, Middleware } from "../store"

/**
 * A generic event dispatched through the store.
 */
export interface MultiplayerEvent {
  type: string
  payload?: unknown
  fromServer?: boolean
  [key: string]: unknown
}

/**
 * Configuration options for the multiplayer middleware.
 */
export interface MultiplayerMiddlewareConfig {
  /**
   * WebSocket server URL.
   * Defaults to ws://<current-hostname>:3000
   */
  serverUrl?: string

  /**
   * Delay (in milliseconds) before attempting to reconnect
   * after the WebSocket connection is closed.
   *
   * @default 1000
   */
  reconnectionDelay?: number

  /**
   * Event types that should NOT be sent to the server.
   */
  blacklist?: string[]

  /**
   * Event types that SHOULD be sent to the server.
   * If provided, only these events are sent.
   */
  whitelist?: string[]

  /**
   * Custom predicate to decide whether an event
   * should be sent to the server.
   */
  filter?: (event: MultiplayerEvent) => boolean
}

/**
 * Creates the multiplayer middleware.
 */
export function multiplayerMiddleware<
  T extends BaseEntity = BaseEntity,
  S extends EntitiesState<T> = EntitiesState<T>,
>(config?: MultiplayerMiddlewareConfig): Middleware<T, S>
