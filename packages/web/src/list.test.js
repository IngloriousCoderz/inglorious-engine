/**
 * @vitest-environment jsdom
 */
import { html } from "lit-html"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { list } from "./list.js"

describe("list", () => {
  let entity

  beforeEach(() => {
    entity = {
      id: "test-list",
      type: "test-item-type",
      items: Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
      })),
    }
  })

  describe("init() and create()", () => {
    it("should set default list properties on init", () => {
      list.init(entity)
      expect(entity.scrollTop).toBe(0)
      expect(entity.visibleRange).toEqual({ start: 0, end: 20 })
      expect(entity.viewportHeight).toBe(600)
      expect(entity.bufferSize).toBe(5)
      expect(entity.itemHeight).toBeNull()
      expect(entity.estimatedHeight).toBe(50)
    })

    it("should not overwrite existing properties on init (except scrollTop)", () => {
      entity.viewportHeight = 800
      entity.visibleRange = { start: 10, end: 30 }

      list.init(entity)

      expect(entity.viewportHeight).toBe(800)
      expect(entity.visibleRange).toEqual({ start: 10, end: 30 })
      expect(entity.scrollTop).toBe(0) // scrollTop is always reset
    })

    it("should reset the list on create", () => {
      list.create(entity)
      expect(entity.scrollTop).toBe(0)
      expect(entity.visibleRange).toEqual({ start: 0, end: 20 })
    })
  })

  describe("scroll()", () => {
    beforeEach(() => {
      list.init(entity)
    })

    it("should calculate visible range based on itemHeight", () => {
      entity.itemHeight = 20
      const containerEl = { scrollTop: 200 } // 10 items down

      list.scroll(entity, containerEl)

      // start = floor(200 / 20) - 5 = 10 - 5 = 5
      // visibleCount = ceil(600 / 20) = 30
      // end = min(5 + 30 + 5, 100) = 40
      expect(entity.visibleRange).toEqual({ start: 5, end: 40 })
      expect(entity.scrollTop).toBe(200)
    })

    it("should calculate visible range based on estimatedHeight if itemHeight is null", () => {
      entity.estimatedHeight = 50
      const containerEl = { scrollTop: 500 } // 10 items down

      list.scroll(entity, containerEl)

      // start = floor(500 / 50) - 5 = 10 - 5 = 5
      // visibleCount = ceil(600 / 50) = 12
      // end = min(5 + 12 + 5, 100) = 22
      expect(entity.visibleRange).toEqual({ start: 5, end: 22 })
    })

    it("should not update if the visible range has not changed", () => {
      entity.itemHeight = 20
      entity.visibleRange = { start: 5, end: 40 }
      const originalRange = { ...entity.visibleRange }

      const containerEl = { scrollTop: 201 } // Still within the same range calculation
      list.scroll(entity, containerEl)

      expect(entity.visibleRange).toEqual(originalRange) // Should not have changed
    })

    it("should handle scrolling to the top", () => {
      entity.itemHeight = 20
      const containerEl = { scrollTop: 0 }

      list.scroll(entity, containerEl)

      // start = max(0, floor(0/20) - 5) = 0
      // end = min(0 + 30 + 5, 100) = 35
      expect(entity.visibleRange).toEqual({ start: 0, end: 35 })
    })

    it("should handle scrolling near the bottom", () => {
      entity.itemHeight = 20
      const containerEl = { scrollTop: 1900 } // 95 items down

      list.scroll(entity, containerEl)

      // start = floor(1900 / 20) - 5 = 95 - 5 = 90
      // visibleCount = 30
      // end = min(90 + 30 + 5, 100) = 100
      expect(entity.visibleRange).toEqual({ start: 90, end: 100 })
    })
  })

  describe("mount()", () => {
    it("should measure and set itemHeight and update visibleRange", () => {
      list.init(entity)
      const itemEl = document.createElement("div")
      vi.spyOn(itemEl, "offsetHeight", "get").mockReturnValue(40)

      const containerEl = {
        querySelector: vi.fn().mockReturnValue(itemEl),
      }

      list.mount(entity, containerEl)

      expect(containerEl.querySelector).toHaveBeenCalledWith("[data-index]")
      expect(entity.itemHeight).toBe(40)
      // end = ceil(600 / 40) = 15
      expect(entity.visibleRange).toEqual({ start: 0, end: 15 })
    })

    it("should do nothing if no item element is found", () => {
      list.init(entity)
      const originalEntity = { ...entity }
      const containerEl = {
        querySelector: vi.fn().mockReturnValue(null),
      }

      list.mount(entity, containerEl)

      expect(entity).toEqual(originalEntity)
    })
  })

  describe("render()", () => {
    let api

    beforeEach(() => {
      list.init(entity)
      api = {
        notify: vi.fn(),
        getType: vi.fn().mockReturnValue({
          renderItem: (item, index) => html`<div>${index}: ${item.name}</div>`,
        }),
      }
    })

    it("should return a lit-html TemplateResult", () => {
      const result = list.render(entity, api)
      // Duck-typing for TemplateResult, as it's not a public class
      expect(result).toHaveProperty("strings")
      expect(result).toHaveProperty("values")
    })

    it("should warn and return empty if items are missing", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {})
      delete entity.items
      const result = list.render(entity, api)
      expect(spy).toHaveBeenCalledWith(`list entity ${entity.id} needs 'items'`)
      expect(result.strings.join("").trim()).toBe("")
      spy.mockRestore()
    })

    it("should warn and return empty if type.renderItem is missing", () => {
      const spy = vi.spyOn(console, "warn").mockImplementation(() => {})
      api.getType.mockReturnValue({}) // No renderItem
      const result = list.render(entity, api)
      expect(spy).toHaveBeenCalledWith(
        `type ${entity.type} needs 'renderItem' method`,
      )
      expect(result.strings.join("").trim()).toBe("")
      spy.mockRestore()
    })

    it("should render only the visible items", () => {
      entity.itemHeight = 50
      entity.visibleRange = { start: 10, end: 15 } // 5 visible items

      const result = list.render(entity, api)
      const renderedItems = result.values.find(Array.isArray)

      expect(renderedItems).toHaveLength(5) // 5 visible items
      // Check if the first rendered item is indeed item 10
      const innerTemplate = renderedItems[0].values[2]
      const renderedText = `${innerTemplate.values[0]}: ${innerTemplate.values[1]}`
      expect(renderedText).toBe("10: Item 10")
    })

    it("should calculate total height correctly", () => {
      entity.itemHeight = 40
      const result = list.render(entity, api)
      // The styleMap for the inner div is at result.values[3].values[0]
      const styleValue = result.values[3].values[0]
      const expectedHeight = 100 * 40 // items.length * itemHeight
      expect(styleValue.height).toBe(`${expectedHeight}px`)
    })
  })

  describe("renderItem()", () => {
    it("should render a default item view", () => {
      const item = { id: 1, value: "test" }
      const result = list.renderItem(item, 5)
      // Duck-typing for TemplateResult
      expect(result).toHaveProperty("strings")
      expect(result).toHaveProperty("values")
      const fullText =
        result.strings[0] +
        result.values[0] +
        result.strings[1] +
        result.values[1] +
        result.strings[2]
      expect(fullText).toBe(`<div>6. ${JSON.stringify(item)}</div>`)
    })
  })
})
