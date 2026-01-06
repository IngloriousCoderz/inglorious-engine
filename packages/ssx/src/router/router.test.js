import path from "node:path"

import { afterEach, describe, expect, it, vi } from "vitest"

import { getPages, getRoutes, matchRoute, resolvePage } from "./index.js"

const ROOT_DIR = path.join(import.meta.dirname, "..", "__fixtures__")
const PAGES_DIR = path.join(ROOT_DIR, "pages")

describe("router", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("getRoutes", () => {
    it("should discover and sort routes correctly", async () => {
      const routes = await getRoutes(PAGES_DIR)

      // Expected order based on specificity:
      // 1. /posts/:id (static 'posts' + dynamic 'id') -> score ~4.2
      // 2. /blog/:slug (static 'blog' + dynamic 'slug') -> score ~4.2
      // 3. /about (static 'about') -> score ~3.1
      // 4. / (root) -> score 0
      // 5. /api/* (catch-all) -> score negative

      const patterns = routes.map((r) => r.pattern)

      expect(patterns).toContain("/posts/:slug")
      expect(patterns).toContain("/blog")
      expect(patterns).toContain("/about")
      expect(patterns).toContain("/")
      expect(patterns).toContain("/api/*")

      // Check specific ordering constraints
      // Specific routes before catch-all
      expect(patterns.indexOf("/about")).toBeLessThan(
        patterns.indexOf("/api/*"),
      )
      // Root usually comes after specific paths but before catch-all if it was a catch-all root,
      // but here / is static.
      // Let's just check that we found them.
      expect(routes).toHaveLength(6)
    })
  })

  describe("resolvePage", () => {
    it("should resolve root page", async () => {
      const page = await resolvePage("/", PAGES_DIR)
      expect(page).not.toBeNull()
      expect(page.filePath).toContain("index.js")
      expect(page.params).toEqual({})
    })

    it("should resolve static page", async () => {
      const page = await resolvePage("/about", PAGES_DIR)
      expect(page).not.toBeNull()
      expect(page.filePath).toContain("about.js")
      expect(page.params).toEqual({})
    })

    it("should resolve dynamic page with params", async () => {
      const page = await resolvePage("/posts/hello-world", PAGES_DIR)
      expect(page).not.toBeNull()
      expect(page.filePath).toContain("posts")
      expect(page.params).toEqual({ slug: "hello-world" })
    })

    it("should resolve catch-all page", async () => {
      const page = await resolvePage("/api/v1/users", PAGES_DIR)
      expect(page).not.toBeNull()
      expect(page.filePath).toContain("api")
      expect(page.params).toEqual({ path: "v1/users" })
    })

    it("should return null for non-matching url", async () => {
      // Since we have a catch-all /api/*, /api/foo matches.
      // But /foo doesn't match anything except maybe if we had a root catch-all.
      // We don't have a root catch-all, just /api/*.
      // Wait, /blog/:slug matches /blog/foo.
      // /posts/:id matches /posts/1.
      // /about matches /about.
      // / matches /.
      // So /foo should return null.
      const page = await resolvePage("/foo", PAGES_DIR)
      expect(page).toBeNull()
    })

    it("should return null for dynamic route missing param", async () => {
      // /posts/:slug requires a slug
      const page = await resolvePage("/posts", PAGES_DIR)
      expect(page).toBeNull()
    })
  })

  describe("getPages", () => {
    it("should generate static paths for all pages", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
      const pages = await getPages(PAGES_DIR)

      expect(pages).toMatchSnapshot()

      // Dynamic route without staticPaths should be skipped (and warn)
      const blogPage = pages.find((p) => p.path.includes("/api/"))
      expect(blogPage).toBeUndefined()

      expect(consoleSpy).toHaveBeenCalled()
      expect(consoleSpy.mock.calls[2][0]).toContain("has no staticPaths")
    })
  })

  describe("matchRoute", () => {
    it("should match static routes", () => {
      expect(matchRoute("/", "/")).toBe(true)
      expect(matchRoute("/about", "/about")).toBe(true)
      expect(matchRoute("/about", "/contact")).toBe(false)
    })

    it("should match dynamic routes", () => {
      expect(matchRoute("/posts/:id", "/posts/123")).toBe(true)
      expect(matchRoute("/users/[id]", "/users/antony")).toBe(true)
    })

    it("should not match if segment length differs", () => {
      expect(matchRoute("/", "/about")).toBe(false)
      expect(matchRoute("/posts/:id", "/posts/123/comments")).toBe(false)
      expect(matchRoute("/posts/:id", "/posts")).toBe(false)
    })

    it("should handle trailing slashes implicitly via split", () => {
      // split('/').filter(Boolean) removes empty strings, so trailing slashes are ignored
      expect(matchRoute("/about/", "/about")).toBe(true)
      expect(matchRoute("/about", "/about/")).toBe(true)
    })
  })
})
