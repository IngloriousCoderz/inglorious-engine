import path from "node:path"

import { expect, it } from "vitest"

import { generateStore } from "../store"
import { generateApp } from "./app"

const ROOT_DIR = path.join(__dirname, "..", "__fixtures__")

it("should generate the app script for a static page", async () => {
  const page = { filePath: path.join(ROOT_DIR, "pages", "index.js") }
  const store = await generateStore([page], { rootDir: ROOT_DIR })

  const renderedPage = { page: { path: "/", modulePath: "index.js" } }
  const app = generateApp(store, [renderedPage])

  expect(app).toMatchSnapshot()
})

it("should generate the app script for a page with an entity", async () => {
  const page = { filePath: path.join(ROOT_DIR, "pages", "about.js") }
  const store = await generateStore([page], { rootDir: ROOT_DIR })
  const renderedPage = { page: { path: "/about", modulePath: "about.js" } }

  const app = generateApp(store, [renderedPage])

  expect(app).toMatchSnapshot()
})

it("should generate the app script for a page that has metadata", async () => {
  const page = { filePath: path.join(ROOT_DIR, "pages", "posts.js") }
  const store = await generateStore([page], { rootDir: ROOT_DIR })
  const renderedPage = { page: { path: "/posts", modulePath: "posts.js" } }

  const app = generateApp(store, [renderedPage])

  expect(app).toMatchSnapshot()
})
