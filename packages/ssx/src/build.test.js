import path from "node:path"

import { it } from "vitest"

import { build } from "./build"

const FIXTURES_DIR = path.join(__dirname, "__fixtures__", "pages")

it.skip("should build full static pages", async () => {
  await build({ pagesDir: FIXTURES_DIR })
})
