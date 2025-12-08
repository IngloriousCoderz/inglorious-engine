/**
 * @vitest-environment jsdom
 */

import { createStore } from "@inglorious/store"
import { html } from "lit-html" // Only html is needed for templates, render is handled by mount
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { mount } from "./mount.js"

let rootElement

beforeEach(() => {
  // Create a fresh DOM element for each test
  rootElement = document.createElement("div")
  document.body.appendChild(rootElement)
  // Spy on console.warn to check for warnings without polluting test output
  vi.spyOn(console, "warn").mockImplementation(() => {})
})

afterEach(() => {
  // Clean up the DOM element after each test
  document.body.removeChild(rootElement)
  // Restore console.warn to its original implementation
  vi.restoreAllMocks()
})

// Helper function to create a store with some common entities and types for testing
function setupStore(entitiesOverride = {}, typesOverride = {}) {
  return createStore({
    // Pass 'entities' as a top-level property to createStore
    entities: {
      "player-1": {
        id: "player-1",
        type: "player",
        name: "Player One",
        score: 0,
      },
      "enemy-1": { id: "enemy-1", type: "enemy", health: 100 },
      ...entitiesOverride,
    },
    // Pass 'types' as a top-level property to createStore
    types: {
      player: {
        render: (entity) =>
          html`<span>Player: ${entity.name}, Score: ${entity.score}</span>`,
        incrementScore: (entity) => {
          entity.score++
        },
      },
      enemy: {
        render: (entity) => html`<span>Enemy: ${entity.health} HP</span>`,
        takeDamage: (entity, amount) => {
          entity.health -= amount
        },
      },
      simpleType: {
        render: () => html`<span>Simple Type Rendered</span>`,
      },
      typeWithoutRender: {
        /* no render function */
      },
      ...typesOverride,
    },
  })
}

describe("mount", () => {
  it("should render the initial state into the element", () => {
    const store = setupStore()
    const renderFn = (api) =>
      html`<div>Hello, ${api.getEntity("player-1").name}!</div>`
    mount(store, renderFn, rootElement)

    expect(rootElement.textContent).toBe("Hello, Player One!")
  })

  it("should re-render when the store state changes", async () => {
    const store = setupStore()
    const renderFn = (api) =>
      html`<div>Score: ${api.getEntity("player-1").score}</div>`
    mount(store, renderFn, rootElement)

    expect(rootElement.textContent).toBe("Score: 0")

    store.notify("incrementScore", "player-1")
    // lit-html renders asynchronously, so we need to wait for the next microtask
    await Promise.resolve()

    expect(rootElement.textContent).toBe("Score: 1")
  })

  it("should stop re-rendering after unsubscribe is called", async () => {
    const store = setupStore()
    const renderFn = (api) =>
      html`<div>Score: ${api.getEntity("player-1").score}</div>`
    const unsubscribe = mount(store, renderFn, rootElement)

    expect(rootElement.textContent).toBe("Score: 0")

    unsubscribe()
    store.notify("incrementScore", "player-1")
    await Promise.resolve() // Wait for potential re-render

    // The score should still be 0 in the DOM because unsubscribe was called
    expect(rootElement.textContent).toBe("Score: 0")
    expect(rootElement.textContent).not.toBe("Score: 1")
  })

  describe("api.select", () => {
    let capturedSelectResult // Used to capture the ReactiveSelectorResult instance across renders

    it("should return the initial selected value", () => {
      const store = setupStore()
      const renderFn = (api) => {
        capturedSelectResult = api.select(
          (api) => api.getEntity("player-1").score,
        )
        return html`<div>Selected: ${capturedSelectResult.value}</div>`
      }
      mount(store, renderFn, rootElement)

      expect(capturedSelectResult.value).toBe(0)
      expect(rootElement.textContent).toBe("Selected: 0")
    })

    it("should update the selected value when the relevant state changes", async () => {
      const store = setupStore()
      const renderFn = (api) => {
        capturedSelectResult = api.select(
          (api) => api.getEntity("player-1").score,
        )
        return html`<div>Selected: ${capturedSelectResult.value}</div>`
      }
      mount(store, renderFn, rootElement)

      expect(capturedSelectResult.value).toBe(0)

      store.notify("incrementScore", "player-1")
      await Promise.resolve() // Wait for store subscription to trigger and update `current` in select, and for lit-html to render

      expect(capturedSelectResult.value).toBe(1)
      expect(rootElement.textContent).toBe("Selected: 1")
    })

    it("should not update the selected value when unrelated state changes", async () => {
      const store = setupStore()
      const renderFn = (api) => {
        capturedSelectResult = api.select(
          (api) => api.getEntity("player-1").score,
        )
        return html`<div>Selected: ${capturedSelectResult.value}</div>`
      }
      mount(store, renderFn, rootElement)

      expect(capturedSelectResult.value).toBe(0)

      store.notify("takeDamage", "enemy-1", 10) // This changes enemy health, not player score
      await Promise.resolve()

      expect(capturedSelectResult.value).toBe(0) // Should remain 0
      expect(rootElement.textContent).toBe("Selected: 0") // DOM also remains 0
    })

    it("should stop updating after api.select unsubscribe is called", async () => {
      const store = setupStore()
      let initialSelectResult
      const renderFn = (api) => {
        // Capture the select result only on the first render to test its specific unsubscribe
        if (!initialSelectResult) {
          initialSelectResult = api.select(
            (api) => api.getEntity("player-1").score,
          )
        }
        return html`<div>Selected: ${initialSelectResult.value}</div>`
      }
      mount(store, renderFn, rootElement)

      expect(initialSelectResult.value).toBe(0)

      initialSelectResult.unsubscribe() // Unsubscribe the reactive selector's internal listener
      store.notify("incrementScore", "player-1")
      await Promise.resolve() // Wait for store subscription to trigger and for lit-html to render

      // The main mount subscription still triggers renderFn, but the `initialSelectResult.value`
      // should *not* have updated because its internal listener was unsubscribed.
      expect(initialSelectResult.value).toBe(0) // Should remain 0
      expect(rootElement.textContent).toBe("Selected: 0")
      expect(rootElement.textContent).not.toBe("Selected: 1")
    })
  })

  describe("api.render", () => {
    it("should render an entity by its ID", async () => {
      const store = setupStore()
      const renderFn = (api) => html`<div>${api.render("player-1")}</div>`
      mount(store, renderFn, rootElement)
      await Promise.resolve()

      expect(rootElement.textContent).toBe("Player: Player One, Score: 0")
    })

    it("should render a type by its ID when allowType is true", async () => {
      const store = setupStore()
      const renderFn = (api) =>
        html`<div>${api.render("simpleType", { allowType: true })}</div>`
      mount(store, renderFn, rootElement)
      await Promise.resolve()

      expect(rootElement.textContent).toBe("Simple Type Rendered")
    })

    it("should return an empty string for a non-existent entity/type without allowType", async () => {
      const store = setupStore()
      const renderFn = (api) =>
        html`<div>${api.render("non-existent-id")}</div>`
      mount(store, renderFn, rootElement)
      await Promise.resolve()

      expect(rootElement.textContent).toBe("") // Empty div because api.render returns ""
      expect(console.warn).not.toHaveBeenCalled() // No warning for non-existent entity without allowType
    })

    it("should return a fallback template and warn for a non-existent entity/type with allowType", async () => {
      const store = setupStore()
      const renderFn = (api) =>
        html`<div>${api.render("non-existent-id", { allowType: true })}</div>`
      mount(store, renderFn, rootElement)
      await Promise.resolve()

      expect(rootElement.textContent).toBe("Not found: non-existent-id")
      expect(console.warn).toHaveBeenCalledWith(
        "No entity or type found: non-existent-id",
      )
    })

    it("should return a fallback template and warn for an entity whose type has no render function", async () => {
      const store = setupStore({
        "no-render-entity": {
          id: "no-render-entity",
          type: "typeWithoutRender",
        },
      })
      const renderFn = (api) =>
        html`<div>${api.render("no-render-entity")}</div>`
      mount(store, renderFn, rootElement)
      await Promise.resolve()

      expect(rootElement.textContent).toBe("No renderer for typeWithoutRender")
      expect(console.warn).toHaveBeenCalledWith(
        "No render function for type: typeWithoutRender",
      )
    })
  })
})
