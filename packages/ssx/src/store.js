import path from "node:path"
import { pathToFileURL } from "node:url"

import { createStore } from "@inglorious/web"

import { getModuleName } from "./module.js"

export async function generateStore(pages = [], options = {}) {
  const { rootDir = "src" } = options

  const types = {}
  for (const page of pages) {
    const pageModule = await import(pathToFileURL(page.filePath))
    const name = getModuleName(pageModule)
    types[name] = pageModule[name]
  }

  const { entities } = await import(
    pathToFileURL(path.join(rootDir, "entities.js"))
  )

  return createStore({ types, entities, updateMode: "manual" })
}
