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
 * API from @inglorious/store
 */
export type { Api as StoreApi } from "@inglorious/store"

/**
 * Client-side router for entity-based systems. Handles URL changes, link interception, and browser history management.
 */
export interface RouterType {
  /**
   * Initializes the router, sets up a popstate listener to handle browser navigation,
   * and intercepts clicks on local links.
   * @param entity The router state entity.
   * @param payload The initialization payload (currently unused).
   * @param api The store API for interacting with the system.
   */
  init(entity: RouterEntity, payload: any, api: StoreApi): void

  /**
   * Navigates to a new route, updating the browser's history and the router entity state.
   * @param {RouterEntity} entity - The router entity.
   * @param {string|number|NavigatePayload} payload - The navigation payload.
   * Can be a path string, a number for `history.go()`, or an object with navigation options.
   * @param {string|number} payload.to - The destination path or history offset.
   * @param {RouteParams} [payload.params] - Route parameters to build the path from a pattern.
   * @param {boolean} [payload.replace] - If true, uses `history.replaceState` instead of `pushState`.
   * @param {Record<string, any>} [payload.state] - Additional state to store in the browser's history.
   * @param {StoreApi} api - The store API.
   */
  navigate(
    entity: RouterEntity,
    payload: string | number | NavigatePayload,
    api: StoreApi,
  ): void

  /**
   * Synchronizes the router entity's state with data from a routing event,
   * typically triggered by a `popstate` event (browser back/forward).
   * @param {RouterEntity} entity - The router entity to update.
   * @param {RouteSyncPayload} payload - The new route state.
   * @param {StoreApi} api - The store API.
   */
  routeSync(
    entity: RouterEntity,
    payload: RouteSyncPayload,
    api: StoreApi,
  ): void

  /**
   * Handles successful async route loading.
   * @param {RouterEntity} entity - The router entity to update.
   * @param {Object} payload - The load success payload.
   * @param {StoreApi} api - The store API.
   */
  loadSuccess(entity: RouterEntity, payload: any, api: StoreApi): void

  /**
   * Handles async route loading errors.
   * @param {RouterEntity} entity - The router entity.
   * @param {Object} payload - The error payload.
   */
  loadError(entity: RouterEntity, payload: any): void
}
