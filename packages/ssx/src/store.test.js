import path from "node:path"

import { expect, it } from "vitest"

import { generateStore } from "./store"

const ROOT_DIR = path.join(__dirname, "__fixtures__")

it("should generate the proper types and entities from a static page", async () => {
  const page = {
    filePath: path.join(ROOT_DIR, "pages", "index.js"),
  }

  const store = await generateStore([page], { rootDir: ROOT_DIR })

  expect(store.getType("index").render).toBeDefined()
  expect(store.getState()).toMatchSnapshot()
})

it("should generate the proper types and entities from a page with an entity", async () => {
  const page = {
    filePath: path.join(ROOT_DIR, "pages", "about.js"),
  }

  const store = await generateStore([page], { rootDir: ROOT_DIR })

  expect(store.getType("about").render).toBeDefined()
  expect(store.getState()).toMatchSnapshot()
})

it("should generate the proper types and entities from a page that has metadata", async () => {
  const page = {
    filePath: path.join(ROOT_DIR, "pages", "blog.js"),
  }

  const store = await generateStore([page], { rootDir: ROOT_DIR })

  expect(store.getType("blog").render).toBeDefined()
  expect(store.getState()).toMatchSnapshot()
})
