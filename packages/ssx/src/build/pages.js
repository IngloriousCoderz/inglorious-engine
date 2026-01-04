import path from "node:path"
import { pathToFileURL } from "node:url"

import { renderPage } from "../render/index.js"
import { extractPageMetadata } from "./metadata.js"

export async function generatePages(store, pages, options = {}) {
  const api = store._api

  for (const page of pages) {
    console.log(`  Rendering ${page.path}...`)

    const module = await import(pathToFileURL(path.resolve(page.filePath)))
    page.module = module

    const entity = api.getEntity(page.moduleName)
    if (module.load) {
      await module.load(entity, page)
    }

    const html = await renderPage(store, page, entity, {
      ...options,
      wrap: true,
    })
    const metadata = extractPageMetadata(store, page, entity, options)

    page.html = html
    page.metadata = metadata
  }

  return pages
}
