const SKIP_FULL_MATCH_GROUP = 1 // .match() result at index 0 is the full string
const REMOVE_COLON_PREFIX = 1

/**
 * @typedef {Object} RouterEntity
 * @property {string} id - The unique identifier for the router entity.
 * @property {Object.<string, string>} routes - A map of URL patterns to entity types.
 * @property {string} [path] - The current URL path.
 * @property {string} [route] - The entity type for the current route.
 * @property {Object.<string, string>} [params] - The parameters extracted from the URL.
 * @property {Object.<string, string>} [query] - The query parameters from the URL.
 * @property {string} [hash] - The URL hash.
 */

/**
 * A client-side router type for an entity-based system. It handles URL changes,
 * link interception, and history management (pushState, replaceState, popstate).
 * @type {import('@inglorious/engine/types/type.js').Type}
 */
export const router = {
  /**
   * Initializes the router. It handles the initial route, sets up a `popstate`
   * listener for browser navigation, and intercepts clicks on local `<a>` links.
   * @param {RouterEntity} entity - The router entity.
   * @param {*} payload - The message payload (unused).
   * @param {import('../types/router.js').RouterApi} api - The router API.
   */
  init(entity, payload, api) {
    // Handle initial route
    const initialPath = window.location.pathname
    const route = findRoute(entity.routes, initialPath)

    if (route) {
      entity.path = route.path
      entity.route = route.entityType
      entity.params = route.params

      const query = Object.fromEntries(
        new URLSearchParams(window.location.search),
      )
      entity.query = query
      entity.hash = window.location.hash
    }

    const id = entity.id
    // Listen for browser back/forward
    window.addEventListener("popstate", () => {
      const path = window.location.pathname
      const { routes } = api.getEntity(id)
      const route = findRoute(routes, path)

      if (route) {
        api.notify("routeSync", {
          path: route.path,
          entityType: route.entityType,
          params: route.params,
          query: Object.fromEntries(
            new URLSearchParams(window.location.search),
          ),
          hash: window.location.hash,
        })
      }
    })

    // Intercept link clicks
    document.addEventListener("click", (e) => {
      // Find the closest <a> tag (handles clicks on children)
      const link = e.target.closest("a")

      if (!link) return

      // Skip external links
      if (link.target === "_blank") return
      if (link.rel === "external") return
      if (link.hasAttribute("data-external")) return

      // Skip different origin links
      if (link.origin !== window.location.origin) return

      // Skip links with download attribute
      if (link.hasAttribute("download")) return

      // Skip mailto:, tel:, etc.
      if (!["http:", "https:"].includes(link.protocol)) return

      // Prevent default and use router
      e.preventDefault()

      const path = link.pathname + link.search + link.hash
      api.notify("navigate", path)
    })
  },

  /**
   * Navigates to a new route, updating the browser's history and the router entity state.
   * @param {RouterEntity} entity - The router entity.
   * @param {string|number|import('../types/router.js').NavigatePayload} payload - The navigation payload.
   * Can be a path string, a number for `history.go()`, or an object with navigation options.
   * @param {string|number} payload.to - The destination path or history offset.
   * @param {Object} [payload.params] - Route parameters to build the path from a pattern.
   * @param {boolean} [payload.replace] - If true, uses `history.replaceState` instead of `pushState`.
   * @param {Object} [payload.state] - Additional state to store in the browser's history.
   * @param {import('../types/router.js').RouterApi} api - The router API.
   */
  navigate(entity, payload, api) {
    if (["number", "string"].includes(typeof payload)) {
      payload = { to: payload }
    }

    const { to, params, replace, state = {} } = payload

    // Numeric navigation (back/forward)
    if (typeof to === "number") {
      history.go(to)
      return
    }

    // Build final path
    let path = to

    // If params provided and "to" looks like a pattern, build the path
    if (params && to.includes(":")) {
      path = buildPath(to, params)
    }

    // If "to" is already a final path (like "/users/1"), use it directly
    // The router will match it against patterns in entity.routes

    const route = findRoute(entity.routes, path)

    if (!route) {
      console.warn(`No route matches path: ${path}`)
      return
    }

    // Prevent navigation if the full path (including query/hash) is identical.
    const currentFullPath =
      entity.path + window.location.search + window.location.hash
    if (path === currentFullPath) {
      return
    }

    // Parse query string
    const [pathname, search] = path.split("?")
    const query = search ? Object.fromEntries(new URLSearchParams(search)) : {}

    // Update entity with routing info
    entity.path = pathname
    entity.route = route.entityType
    entity.params = route.params
    entity.query = query
    entity.hash = window.location.hash

    // Prepare history state
    const historyState = {
      ...state,
      route: route.entityType,
      params: route.params,
      query,
      path: pathname,
    }

    // Navigate
    const method = replace ? "replaceState" : "pushState"
    history[method](historyState, "", path)

    api.notify("routeChange", historyState)
  },

  /**
   * Synchronizes the router entity's state with data from a routing event,
   * typically triggered by a `popstate` event (browser back/forward).
   * @param {RouterEntity} entity - The router entity to update.
   * @param {import('../types/router.js').RouteSyncPayload} payload - The new route state.
   */
  routeSync(entity, payload) {
    entity.path = payload.path
    entity.route = payload.entityType
    entity.params = payload.params
    entity.query = payload.query
    entity.hash = payload.hash
  },
}

/**
 * Builds a URL path by substituting parameters into a route pattern.
 * Example: `buildPath("/users/:userId", { userId: "123" })` returns `"/users/123"`.
 * @param {string} pattern - The route pattern (e.g., "/users/:userId").
 * @param {Object.<string, string>} [params={}] - The parameters to substitute.
 * @returns {string} The constructed path.
 */
function buildPath(pattern, params = {}) {
  let path = pattern
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value)
  })
  return path
}

/**
 * Finds a matching route configuration for a given URL path.
 * It supports parameterized routes and a fallback "*" route.
 * @param {Object.<string, string>} routes - The routes configuration map.
 * @param {string} path - The URL path to match.
 * @returns {{pattern: string, entityType: string, params: Object, path: string}|null}
 * The matched route object or null if no match is found.
 */
function findRoute(routes, path) {
  const [pathname] = path.split("?")
  let fallbackRoute = null

  for (const [pattern, entityType] of Object.entries(routes)) {
    if (pattern === "*") {
      fallbackRoute = { pattern, entityType, params: {}, path: pathname }
      continue
    }
    const params = matchRoute(pattern, pathname)
    if (params !== null) {
      return { pattern, entityType, params, path: pathname }
    }
  }
  return fallbackRoute
}

/**
 * Matches a URL path against a route pattern and extracts any parameters.
 * @param {string} pattern - The route pattern (e.g., "/users/:userId").
 * @param {string} path - The URL path to match (e.g., "/users/123").
 * @returns {Object.<string, string>|null} An object of extracted parameters,
 * or null if the path does not match the pattern.
 */
function matchRoute(pattern, path) {
  const paramNames = getParamNames(pattern)
  const regex = patternToRegex(pattern)
  const match = path.match(regex)

  if (!match) return null

  const params = {}
  paramNames.forEach((name, i) => {
    params[name] = match[i + SKIP_FULL_MATCH_GROUP]
  })

  return params
}

/**
 * Parses a route pattern and extracts the names of its parameters.
 * Example: `getParamNames("/users/:userId/posts/:postId")` returns `["userId", "postId"]`.
 * @param {string} pattern - The route pattern.
 * @returns {string[]} An array of parameter names.
 */
function getParamNames(pattern) {
  const matches = pattern.match(/:(\w+)/g)
  return matches ? matches.map((m) => m.slice(REMOVE_COLON_PREFIX)) : []
}

/**
 * Converts a route pattern into a regular expression for matching URL paths.
 * @param {string} pattern - The route pattern (e.g., "/users/:userId").
 * @returns {RegExp} The corresponding regular expression.
 */
function patternToRegex(pattern) {
  const regexPattern = pattern
    .replace(/\//g, "\\/")
    .replace(/:(\w+)/g, "([^\\/]+)")
  return new RegExp(`^${regexPattern}$`)
}
