/**
 * A map of route patterns to entity types.
 * The order of routes matters: more specific routes (e.g., `/users/new`)
 * should be defined before more generic ones (e.g., `/users/:id`).
 *
 * A special `'*'` pattern can be used as a fallback for "not found" routes.
 * @example { "/users/:id": "userPage", "/": "homePage" }
 */
export type RoutesConfig = Record<string, string>

/**
 * An object containing parameters extracted from the route.
 * @example { id: "123" } for route "/users/:id" and path "/users/123"
 */
export type RouteParams = Record<string, string>

/**
 * An object containing query string parameters.
 * @example { sort: "asc" } for path "/users?sort=asc"
 */
export type QueryParams = Record<string, string>

/**
 * Represents the state of the router entity.
 */
export interface RouterEntity {
  /** A unique identifier for the router entity. */
  id: string | number
  /** The route configuration. */
  routes: RoutesConfig
  /** The current active path, without query string or hash. */
  path?: string
  /** The entity type of the current active route. */
  route?: string
  /** The parameters extracted from the current path. */
  params?: RouteParams
  /** The query parameters from the current URL. */
  query?: QueryParams
  /** The hash from the current URL. */
  hash?: string
}

/**
 * The payload for the `navigate` function.
 */
export interface NavigatePayload {
  /** The path to navigate to, or a number to move in the history stack (e.g., -1 for back). */
  to: string | number
  /** Parameters to build a dynamic path from a pattern. */
  params?: RouteParams
  /** If true, `history.replaceState` will be used instead of `history.pushState`. */
  replace?: boolean
  /** Additional state to be stored in the browser's history. */
  state?: Record<string, any>
}

/**
 * The payload for the `routeSync` event, containing all information about the new route.
 */
export interface RouteSyncPayload {
  path: string
  entityType: string
  params: RouteParams
  query: QueryParams
  hash: string
}

/**
 * The API object provided to the router for interacting with the host system.
 */
export interface RouterApi {
  /** Retrieves an entity by its ID. */
  getEntity(id: string | number): { routes: RoutesConfig }
  /** Dispatches an event to the system. */
  notify(eventName: "routeSync", payload: RouteSyncPayload): void
  notify(eventName: "navigate", payload: string): void
}

/**
 * The router implementation.
 */
export declare const router: {
  /**
   * Initializes the router, sets up a popstate listener to handle browser navigation,
   * and intercepts clicks on local links.
   * @param entity The router state entity.
   * @param payload The initialization payload (currently unused).
   * @param api The API for interacting with the host system.
   */
  init(entity: RouterEntity, payload: any, api: RouterApi): void

  /**
   * Navigates to a new route programmatically.
   * @param entity The router state entity.
   * @param payload The navigation details.
   * @param api The API for interacting with the host system.
   */
  navigate(
    entity: RouterEntity,
    payload: string | number | NavigatePayload,
    api: RouterApi,
  ): void

  /**
   * Synchronizes the router entity's state with the provided route information.
   * Typically called in response to a `popstate` event.
   * @param entity The router state entity.
   * @param payload The new route information.
   */
  routeSync(entity: RouterEntity, payload: RouteSyncPayload): void
}
