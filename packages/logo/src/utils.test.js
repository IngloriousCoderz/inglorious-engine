/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest"

import { closestAncestor, saturate } from "./utils.js"

describe("utils", () => {
  describe("saturate", () => {
    it("clamps positive values to the limit", () => {
      expect(saturate(10, 5)).toBe(5)
    })

    it("clamps negative values to -limit", () => {
      expect(saturate(-10, 5)).toBe(-5)
    })

    it("returns value when within limits", () => {
      expect(saturate(3, 5)).toBe(3)
    })
  })

  describe("closestAncestor", () => {
    it("finds an ancestor by class name up to the search depth", () => {
      const root = document.createElement("div")
      root.className = "logo"

      const child1 = document.createElement("div")
      const child2 = document.createElement("div")
      const leaf = document.createElement("span")

      root.appendChild(child1)
      child1.appendChild(child2)
      child2.appendChild(leaf)

      const found = closestAncestor(leaf, "logo")
      expect(found).toBe(root)
    })

    it("returns null when ancestor not found or invalid className", () => {
      const el = document.createElement("div")
      const result = closestAncestor(el, "non-existent")
      expect(result).toBeUndefined()
    })
  })
})
