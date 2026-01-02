import path from "node:path"

import { createStore } from "@inglorious/web"
import { expect, it } from "vitest"

import { renderPage } from "./render"

const ROOT_DIR = path.join(__dirname, "__fixtures__")
const PAGES_DIR = path.join(ROOT_DIR, "pages")

const DEFAULT_OPTIONS = { stripLitMarkers: true }

it("should render a static page fragment", async () => {
  const page = { path: "/" }
  const module = await import(path.resolve(path.join(PAGES_DIR, "about.js")))

  const store = createStore({
    types: { about: module.about },
    updateMode: "manual",
  })

  const html = await renderPage(store, page, module, DEFAULT_OPTIONS)

  expect(html).toMatchSnapshot()
})

it("should render a page with entity", async () => {
  const page = { path: "/about" }
  const module = await import(path.resolve(path.join(PAGES_DIR, "about.js")))

  const store = createStore({
    types: { about: module.about },
    entities: { about: { type: "about", name: "Us" } },
    updateMode: "manual",
  })

  const html = await renderPage(store, page, module, DEFAULT_OPTIONS)

  expect(html).toMatchSnapshot()
})

it("should render a page with metadata", async () => {
  const page = { path: "/about" }
  const module = await import(path.resolve(path.join(PAGES_DIR, "about.js")))

  const store = createStore({
    types: { about: module.about },
    updateMode: "manual",
  })

  const html = await renderPage(store, page, module, {
    ...DEFAULT_OPTIONS,
    wrap: true,
  })

  expect(html).toMatchSnapshot()
})

it("should render a page with pre-fetched data", async () => {
  const page = { path: "/blog" }
  const module = await import(path.resolve(path.join(PAGES_DIR, "blog.js")))

  const store = createStore({
    types: { blog: module.blog },
    entities: { blog: { type: "blog", name: "Antony", posts: [] } },
    updateMode: "manual",
  })

  const html = await renderPage(store, page, module, DEFAULT_OPTIONS)

  expect(html).toMatchSnapshot()
})
