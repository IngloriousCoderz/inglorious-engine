import path from "node:path"

import { createStore } from "@inglorious/web"
import { expect, it } from "vitest"

import { renderPage } from "./render"

const PAGES_DIR = path.join(__dirname, "__fixtures__", "pages")

const DEFAULT_OPTIONS = { stripLitMarkers: true }

it("should render a static page fragment", async () => {
  const module = await import(path.resolve(path.join(PAGES_DIR, "about.js")))

  const store = createStore({
    types: { about: module.about },
    updateMode: "manual",
  })

  const html = renderPage(store, module, DEFAULT_OPTIONS)

  expect(html).toMatchSnapshot()
})

it("should render a whole static page", async () => {
  const module = await import(path.resolve(path.join(PAGES_DIR, "about.js")))

  const store = createStore({
    types: { about: module.about },
    updateMode: "manual",
  })

  const html = renderPage(store, module, {
    ...DEFAULT_OPTIONS,
    wrap: true,
  })

  expect(html).toMatchSnapshot()
})

it("should render a page with entity", async () => {
  const module = await import(path.resolve(path.join(PAGES_DIR, "about.js")))

  const store = createStore({
    types: { about: module.about },
    entities: { about: { type: "about", name: "Us" } },
    updateMode: "manual",
  })

  const html = renderPage(store, module, DEFAULT_OPTIONS)

  expect(html).toMatchSnapshot()
})
