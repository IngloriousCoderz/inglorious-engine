import path from "node:path"

import { describe, expect, it, vi } from "vitest"

import { generateStore } from "."

const ROOT_DIR = path.join(import.meta.dirname, "..", "__fixtures__")
const PAGES_DIR = path.join(ROOT_DIR, "src", "pages")

describe("generateStore", () => {
  it("should generate the proper types and entities from a static page", async () => {
    const page = {
      filePath: path.join(PAGES_DIR, "index.js"),
    }

    const store = await generateStore([page], { rootDir: ROOT_DIR })

    expect(store.getType("index").render).toBeDefined()
    expect(store.getState()).toMatchSnapshot()
  })

  it("should generate the proper types and entities from a page with an entity", async () => {
    const page = {
      filePath: path.join(PAGES_DIR, "about.js"),
    }

    const store = await generateStore([page], { rootDir: ROOT_DIR })

    expect(store.getType("about").render).toBeDefined()
    expect(store.getState()).toMatchSnapshot()
  })

  it("should generate the proper types and entities from a page that has metadata", async () => {
    const page = {
      filePath: path.join(PAGES_DIR, "blog.js"),
    }

    const store = await generateStore([page], { rootDir: ROOT_DIR })

    expect(store.getType("blog").render).toBeDefined()
    expect(store.getState()).toMatchSnapshot()
  })

  it("should handle missing entities.js gracefully", async () => {
    const page = {
      filePath: path.join(PAGES_DIR, "index.js"),
    }

    // Point to a directory that doesn't contain entities.js
    const store = await generateStore([page], {
      rootDir: path.join(ROOT_DIR, "pages"),
    })

    // Should initialize with empty entities (or at least not the ones from fixtures)
    expect(store.getState()).not.toHaveProperty("about")
  })

  it("should attempt to load entities.js and entities.ts", async () => {
    const loader = vi.fn(async (p) => {
      // Mock a successful page load
      if (p.endsWith("index.js")) {
        return { index: { render: () => {} } }
      }
      // Mock entity files not being found
      throw new Error("MODULE_NOT_FOUND")
    })

    const page = { filePath: path.join(PAGES_DIR, "index.js") }
    await generateStore([page], { rootDir: "." }, loader)

    expect(loader).toHaveBeenCalledWith(page.filePath)
    expect(loader).toHaveBeenCalledWith(
      path.join("src", "store", "entities.js"),
    )
    expect(loader).toHaveBeenCalledWith(
      path.join("src", "store", "entities.ts"),
    )
  })
})
