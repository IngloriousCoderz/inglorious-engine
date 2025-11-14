const SKIP_FULL_MATCH_GROUP = 1 // .match() result at index 0 is the full string
const REMOVE_COLON_PREFIX = 1

export const router = {
  /**
   * Initialize router - sets up popstate listener
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
   * Navigate to a new route
   *
   * @param {Object} entity - Router entity
   * @param {Object} payload - Navigation payload
   * @param {string|number} payload.to - Path to navigate to, or number for history.go()
   * @param {Object} payload.params - Route parameters (if using pattern)
   * @param {boolean} payload.replace - Use replaceState instead of pushState
   * @param {Object} payload.state - Additional state to store in history
   */
  navigate(entity, payload) {
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
  },

  routeSync(entity, payload) {
    entity.path = payload.path
    entity.route = payload.entityType
    entity.params = payload.params
    entity.query = payload.query
    entity.hash = payload.hash
  },
}

/**
 * Build a path from a pattern and params
 * buildPath("/users/:userId", { userId: "123" }) -> "/users/123"
 */
function buildPath(pattern, params = {}) {
  let path = pattern
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value)
  })
  return path
}

/**
 * Find matching route from routes config
 * findRoute({ "/users/:userId": "user" }, "/users/123")
 * -> { pattern: "/users/:userId", entityType: "user", params: { userId: "123" } }
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
 * Match a path against a pattern and extract params
 * matchRoute("/users/:userId", "/users/123") -> { userId: "123" }
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
 * Parse a route pattern and extract param names
 * "/users/:userId/posts/:postId" -> ["userId", "postId"]
 */
function getParamNames(pattern) {
  const matches = pattern.match(/:(\w+)/g)
  return matches ? matches.map((m) => m.slice(REMOVE_COLON_PREFIX)) : []
}

/**
 * Convert route pattern to regex
 * "/users/:userId" -> /^\/users\/([^\/]+)$/
 */
function patternToRegex(pattern) {
  const regexPattern = pattern
    .replace(/\//g, "\\/")
    .replace(/:(\w+)/g, "([^\\/]+)")
  return new RegExp(`^${regexPattern}$`)
}
