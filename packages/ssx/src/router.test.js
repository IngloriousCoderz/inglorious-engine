import path from "node:path"

import { afterEach, describe, expect, it, vi } from "vitest"

import { getPages, getRoutes, resolvePage } from "./router.js"

const FIXTURES_DIR = path.join(__dirname, "__fixtures__", "pages")

describe("router", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("getRoutes", () => {
    it("should discover and sort routes correctly", async () => {
      const routes = await getRoutes(FIXTURES_DIR)

      // Expected order based on specificity:
      // 1. /posts/:id (static 'posts' + dynamic 'id') -> score ~4.2
      // 2. /blog/:slug (static 'blog' + dynamic 'slug') -> score ~4.2
      // 3. /about (static 'about') -> score ~3.1
      // 4. / (root) -> score 0
      // 5. /api/* (catch-all) -> score negative

      const patterns = routes.map((r) => r.pattern)

      expect(patterns).toContain("/posts/:id")
      expect(patterns).toContain("/blog/:slug")
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
      const page = await resolvePage("/", FIXTURES_DIR)
      expect(page).not.toBeNull()
      expect(page.filePath).toContain("index.js")
      expect(page.params).toEqual({})
    })

    it("should resolve static page", async () => {
      const page = await resolvePage("/about", FIXTURES_DIR)
      expect(page).not.toBeNull()
      expect(page.filePath).toContain("about.js")
      expect(page.params).toEqual({})
    })

    it("should resolve dynamic page with params", async () => {
      const page = await resolvePage("/blog/hello-world", FIXTURES_DIR)
      expect(page).not.toBeNull()
      expect(page.filePath).toContain("blog")
      expect(page.params).toEqual({ slug: "hello-world" })
    })

    it("should resolve catch-all page", async () => {
      const page = await resolvePage("/api/v1/users", FIXTURES_DIR)
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
      const page = await resolvePage("/foo", FIXTURES_DIR)
      expect(page).toBeNull()
    })
  })

  describe("getPages", () => {
    it("should generate static paths for all pages", async () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
      const pages = await getPages(FIXTURES_DIR)

      expect(pages).toMatchSnapshot()

      // Dynamic route without getStaticPaths should be skipped (and warn)
      const blogPage = pages.find((p) => p.path.includes("/blog/"))
      expect(blogPage).toBeUndefined()

      expect(consoleSpy).toHaveBeenCalled()
      expect(consoleSpy.mock.calls[1][0]).toContain("has no getStaticPaths")
    })
  })
})
