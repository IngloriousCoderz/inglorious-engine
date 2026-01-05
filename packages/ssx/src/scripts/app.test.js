import path from "node:path"

import { describe, expect, it } from "vitest"

import { generateStore } from "../store"
import { generateApp } from "./app"

const ROOT_DIR = path.join(__dirname, "..", "__fixtures__")

describe("generateApp", () => {
  it("should generate the app script for a static page", async () => {
    const page = {
      pattern: "/",
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
      pattern: "/about",
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
      pattern: "/blog",
      path: "/blog",
      modulePath: "blog.js",
      filePath: path.join(ROOT_DIR, "pages", "blog.js"),
    }
    const store = await generateStore([page], { rootDir: ROOT_DIR })

    const app = generateApp(store, [page])

    expect(app).toMatchSnapshot()
  })

  it("should generate the app script for a dynamic page", async () => {
    const page = {
      pattern: "/posts/:slug",
      path: "/posts/my-first-post",
      modulePath: "post.js",
      filePath: path.join(ROOT_DIR, "pages", "posts", "_slug.js"),
    }
    const store = await generateStore([page], { rootDir: ROOT_DIR })

    const app = generateApp(store, [page])

    expect(app).toMatchSnapshot()
  })
})
