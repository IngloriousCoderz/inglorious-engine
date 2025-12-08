/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { router } from "./router.js"

describe("router", () => {
  let entity
  let api

  beforeEach(() => {
    entity = {
      id: "router",
      type: "router",
      routes: {
        "/": "homePage",
        "/users": "userListPage",
        "/users/:id": "userPage",
        "/users/:id/posts/:postId": "postPage",
        "*": "notFoundPage",
      },
    }

    api = {
      getEntity: vi.fn().mockReturnValue(entity),
      notify: vi.fn(),
    }

    // Mock window.location and history
    vi.spyOn(window, "location", "get").mockReturnValue({
      pathname: "/",
      search: "",
      hash: "",
      origin: "http://localhost:3000",
    })
    vi.spyOn(history, "pushState").mockImplementation(() => {})
    vi.spyOn(history, "replaceState").mockImplementation(() => {})
    vi.spyOn(history, "go").mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("init()", () => {
    it("should initialize with the current window.location", () => {
      vi.spyOn(window, "location", "get").mockReturnValue({
        pathname: "/users/123",
        search: "?sort=asc",
        hash: "#details",
        origin: "http://localhost:3000",
      })

      router.init(entity, {}, api)

      expect(entity.path).toBe("/users/123")
      expect(entity.route).toBe("userPage")
      expect(entity.params).toEqual({ id: "123" })
      expect(entity.query).toEqual({ sort: "asc" })
      expect(entity.hash).toBe("#details")
    })

    it("should set up a popstate listener", () => {
      const spy = vi.spyOn(window, "addEventListener")
      router.init(entity, {}, api)
      expect(spy).toHaveBeenCalledWith("popstate", expect.any(Function))
    })

    it("should set up a click listener for link interception", () => {
      const spy = vi.spyOn(document, "addEventListener")
      router.init(entity, {}, api)
      expect(spy).toHaveBeenCalledWith("click", expect.any(Function))
    })
  })

  describe("navigate()", () => {
    it("should navigate to a new path and update the entity", () => {
      router.navigate(entity, "/users/456?q=test", api)

      expect(entity.path).toBe("/users/456")
      expect(entity.route).toBe("userPage")
      expect(entity.params).toEqual({ id: "456" })
      expect(entity.query).toEqual({ q: "test" })
      expect(history.pushState).toHaveBeenCalledWith(
        expect.any(Object),
        "",
        "/users/456?q=test",
      )
      expect(api.notify).toHaveBeenCalledWith("routeChange", expect.any(Object))
    })

    it("should use replaceState when replace is true", () => {
      router.navigate(entity, { to: "/users", replace: true }, api)
      expect(history.replaceState).toHaveBeenCalled()
      expect(history.pushState).not.toHaveBeenCalled()
    })

    it("should handle numeric navigation", () => {
      router.navigate(entity, -1, api)
      expect(history.go).toHaveBeenCalledWith(-1)
    })

    it("should build path from params", () => {
      router.navigate(
        entity,
        { to: "/users/:id/posts/:postId", params: { id: 1, postId: 2 } },
        api,
      )
      expect(history.pushState).toHaveBeenCalledWith(
        expect.any(Object),
        "",
        "/users/1/posts/2",
      )
      expect(entity.route).toBe("postPage")
      expect(entity.params).toEqual({ id: "1", postId: "2" })
    })

    it("should use the fallback route for unknown paths", () => {
      router.navigate(entity, "/some/unknown/path", api)
      expect(entity.route).toBe("notFoundPage")
      expect(entity.params).toEqual({})
    })

    it("should not navigate if the path is identical", () => {
      entity.path = "/users"
      vi.spyOn(window, "location", "get").mockReturnValue({
        pathname: "/users",
        search: "",
        hash: "",
      })

      router.navigate(entity, "/users", api)

      expect(history.pushState).not.toHaveBeenCalled()
      expect(api.notify).not.toHaveBeenCalledWith(
        "routeChange",
        expect.any(Object),
      )
    })
  })

  describe("routeSync()", () => {
    it("should update the entity state from a payload", () => {
      const payload = {
        path: "/new",
        entityType: "newPage",
        params: {},
        query: { a: "1" },
        hash: "#section",
      }
      router.routeSync(entity, payload)
      expect(entity.path).toBe("/new")
      expect(entity.route).toBe("newPage")
      expect(entity.query).toEqual({ a: "1" })
    })
  })
})
