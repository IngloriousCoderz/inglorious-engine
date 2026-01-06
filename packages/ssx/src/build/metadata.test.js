import { describe, expect, it, vi } from "vitest"

import { extractPageMetadata } from "./metadata.js"

describe("extractPageMetadata", () => {
  it("should handle invalid updatedAt gracefully", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
    const store = { _api: {} }
    const page = {
      path: "/test",
      module: { metadata: { updatedAt: "invalid-date" } },
    }
    const entity = {}

    const metadata = extractPageMetadata(store, page, entity)
    expect(metadata.lastmod).toBeDefined()
    expect(consoleSpy).toHaveBeenCalled()
  })
})
