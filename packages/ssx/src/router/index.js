import path from "node:path"
import { pathToFileURL } from "node:url"

import { glob } from "glob"

import { getModuleName } from "../module.js"

const NEXT_MATCH = 1

const STATIC_SEGMENT_WEIGHT = 3
const CATCH_ALL_ROUTE_WEIGHT = -10
const SCORE_MULTIPLIER = 0.1

/**
 * Get all static paths for SSG build.
 * This calls getStaticPaths() on dynamic route pages.
 */
export async function getPages(pagesDir = "pages") {
  const routes = await getRoutes(pagesDir)
  const pages = []

  for (const route of routes) {
    const module = await import(pathToFileURL(path.resolve(route.filePath)))
    const moduleName = getModuleName(module)

    if (isDynamic(route.pattern)) {
      // Dynamic route - call getStaticPaths if it exists
      if (typeof module.getStaticPaths === "function") {
        const paths = await module.getStaticPaths()

        for (const pathOrObject of paths) {
          const path =
            typeof pathOrObject === "string" ? pathOrObject : pathOrObject.path

          const params = extractParams(route, path)

          pages.push({
            pattern: route.pattern,
            path,
            params,
            module,
            moduleName,
            modulePath: route.modulePath,
            filePath: route.filePath,
          })
        }
      } else {
        console.warn(
          `Dynamic route ${route.filePath} has no getStaticPaths export. ` +
            `It will be skipped during SSG.`,
        )
      }
    } else {
      // Static route - add directly
      pages.push({
        pattern: route.pattern,
        path: route.pattern || "/",
        params: {},
        module,
        moduleName,
        modulePath: route.modulePath,
        filePath: route.filePath,
      })
    }
  }

  return pages
}

/**
 * Resolve a URL to a page file and extract params.
 * Used by dev server for on-demand rendering.
 */
export async function resolvePage(url, pagesDir = "pages") {
  const routes = await getRoutes(pagesDir)

  // Normalize URL (remove query string and hash)
  const [fullPath] = url.split("?")
  const [normalizedUrl] = fullPath.split("#")

  for (const route of routes) {
    const match = route.regex.exec(normalizedUrl)

    if (match) {
      const params = {}
      route.params.forEach((param, i) => {
        params[param] = match[i + NEXT_MATCH]
      })

      return {
        filePath: route.filePath,
        params,
      }
    }
  }

  return null
}

/**
 * Discovers all pages in the pages directory.
 * Returns an array of route objects with pattern matching info.
 */
export async function getRoutes(pagesDir = "pages") {
  // Find all .js and .ts files in pages directory
  const files = await glob("**/*.{js,ts}", {
    cwd: pagesDir,
    ignore: ["**/*.test.{js,ts}", "**/*.spec.{js,ts}"],
    posix: true,
  })

  const routes = files.map((file) => {
    const filePath = path.join(pagesDir, file)
    const pattern = filePathToPattern(file)
    const { regex, params } = patternToRegex(pattern)

    return {
      pattern,
      modulePath: file,
      filePath,
      regex,
      params,
    }
  })

  // Sort routes by specificity (most specific first)
  routes.sort((a, b) => {
    const aScore = routeSpecificity(a.pattern)
    const bScore = routeSpecificity(b.pattern)
    return bScore - aScore
  })

  return routes
}

/**
 * Convert a file path to a route pattern.
 * pages/index.js -> /
 * pages/about.js -> /about
 * pages/blog/[slug].js -> /blog/:slug
 * pages/api/[...path].js -> /api/*
 */
function filePathToPattern(file) {
  let pattern = file
    .replace(/\\/g, "/")
    .replace(/\.(js|ts)$/, "") // Remove extension
    .replace(/\/index$/, "") // index becomes root of directory
    .replace(/^index$/, "") // Handle root index
    .replace(/__(\w+)/g, "*") // __path becomes *
    .replace(/_(\w+)/g, ":$1") // _id becomes :id

  // Normalize to start with /
  return "/" + pattern.replace(/^\//, "")
}

/**
 * Convert a route pattern to a regex and extract parameter names.
 */
function patternToRegex(pattern) {
  const params = []

  // Replace :param with capture groups
  let regexStr = pattern.replace(/:(\w+)/g, (_, param) => {
    params.push(param)
    return "([^/]+)"
  })

  // Replace * with greedy capture
  regexStr = regexStr.replace(/\*/g, () => {
    params.push("path")
    return "(.*)"
  })

  // Exact match
  regexStr = "^" + regexStr + "$"

  return {
    regex: new RegExp(regexStr),
    params,
  }
}

/**
 * Calculate route specificity for sorting.
 * Higher score = more specific = should match first.
 */
function routeSpecificity(pattern) {
  let score = 0

  // Static segments add 3 points each
  const segments = pattern.split("/").filter(Boolean)
  segments.forEach((segment) => {
    if (!segment.startsWith(":") && segment !== "*") {
      score += STATIC_SEGMENT_WEIGHT
    }
  })

  // Dynamic segments add 1 point
  const dynamicCount = (pattern.match(/:/g) || []).length
  score += dynamicCount

  // Catch-all routes have lowest priority (subtract points)
  if (pattern.includes("*")) {
    score += CATCH_ALL_ROUTE_WEIGHT
  }

  // Longer paths are more specific
  score += segments.length * SCORE_MULTIPLIER

  return score
}

/**
 * Check if a pattern is dynamic (contains params or wildcards).
 */
function isDynamic(pattern) {
  return pattern.includes(":") || pattern.includes("*")
}

/**
 * Extract params from a URL based on a route.
 */
function extractParams(route, url) {
  const match = route.regex.exec(url)
  if (!match) return {}

  const params = {}
  route.params.forEach((param, i) => {
    params[param] = match[i + NEXT_MATCH]
  })

  return params
}
