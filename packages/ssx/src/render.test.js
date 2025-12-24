import path from "node:path"

import { expect, it } from "vitest"

import { renderPage } from "./render"

const FIXTURES_DIR = path.join(__dirname, "__fixtures__", "pages")

const DEFAULT_OPTIONS = { stripLitMarkers: true }

it("should render a static page fragment", async () => {
  const filePath = path.resolve(path.join(FIXTURES_DIR, "about.js"))
  const module = await import(filePath)

  const html = renderPage(module, DEFAULT_OPTIONS)

  expect(html).toMatchSnapshot()
})

it("should render a whole static page", async () => {
  const filePath = path.resolve(path.join(FIXTURES_DIR, "about.js"))
  const module = await import(filePath)

  const html = renderPage(module, {
    ...DEFAULT_OPTIONS,
    wrap: true,
    title: "About",
    styles: ["/style.css"],
    scripts: ["/ga.js"],
  })

  expect(html).toMatchSnapshot()
})
