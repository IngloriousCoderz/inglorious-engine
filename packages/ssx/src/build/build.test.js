import path from "node:path"

import { it } from "vitest"

import { build } from "."

const ROOT_DIR = path.join(__dirname, "__fixtures__")

it.skip("should build full static pages", async () => {
  await build({ rootDir: ROOT_DIR })
})
