import path from "node:path"

import { expect, it } from "vitest"

import { generateStore } from "../store"
import { generateApp } from "./app"

const ROOT_DIR = path.join(__dirname, "..", "__fixtures__")

it("should generate the app script for a static page", async () => {
  const page = {
    path: "/",
    modulePath: "index.js",
    filePath: path.join(ROOT_DIR, "pages", "index.js"),
  }
  const store = await generateStore([page], { rootDir: ROOT_DIR })

  const app = generateApp(store, [page])

  expect(app).toMatchSnapshot()
})

it("should generate the app script for a page with an entity", async () => {
  const page = {
    path: "/about",
    modulePath: "about.js",
    filePath: path.join(ROOT_DIR, "pages", "about.js"),
  }
  const store = await generateStore([page], { rootDir: ROOT_DIR })

  const app = generateApp(store, [page])

  expect(app).toMatchSnapshot()
})

it("should generate the app script for a page that has metadata", async () => {
  const page = {
    path: "/blog",
    modulePath: "blog.js",
    filePath: path.join(ROOT_DIR, "pages", "blog.js"),
  }
  const store = await generateStore([page], { rootDir: ROOT_DIR })

  const app = generateApp(store, [page])

  expect(app).toMatchSnapshot()
})
