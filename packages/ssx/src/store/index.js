import path from "node:path"
import { pathToFileURL } from "node:url"

import { createStore } from "@inglorious/web"

import { getModuleName } from "../utils/module.js"

/**
 * Generates the application store based on the provided pages and configuration.
 * It loads page modules to register their exported entities as store types.
 * It also attempts to load initial entities from an `entities.js` file in the root directory.
 *
 * @param {Array<Object>} pages - List of page objects containing file paths.
 * @param {Object} options - Configuration options.
 * @param {string} [options.rootDir="src"] - Root directory to look for entities.js.
 * @returns {Promise<Object>} The initialized store instance.
 */
export async function generateStore(pages = [], options = {}) {
  const { rootDir = "src" } = options

  const types = {}
  for (const page of pages) {
    const pageModule = await import(pathToFileURL(page.filePath))
    const name = getModuleName(pageModule)
    types[name] = pageModule[name]
  }

  let entities = {}
  try {
    const module = await import(
      pathToFileURL(path.join(rootDir, "entities.js"))
    )
    entities = module.entities
  } catch {
    entities = {}
  }

  return createStore({ types, entities, updateMode: "manual" })
}
