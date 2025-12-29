import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

import { createStore } from "@inglorious/web"
import { build as viteBuild } from "vite"

import { getModuleName } from "./module.js"
import { renderPage } from "./render.js"
import { getPages } from "./router.js"
import { generateApp } from "./scripts/app.js"
import { generateLitLoader } from "./scripts/lit-loader.js"
import { generateMain } from "./scripts/main.js"
import { createViteConfig } from "./vite-config.js"

export async function build(options = {}) {
  const { rootDir = "src", outDir = "dist", renderOptions = {} } = options

  console.log("🔨 Starting build...\n")

  // Clean output directory
  await fs.rm(outDir, { recursive: true, force: true })
  await fs.mkdir(outDir, { recursive: true })

  // Get all pages to build
  const pages = await getPages(path.join(rootDir, "pages"))
  console.log(`📄 Found ${pages.length} pages to build\n`)

  // Generate store config once for all pages
  const store = await generateStore(rootDir, pages)

  // Render all pages
  const renderedPages = await generatePages(store, pages, renderOptions)

  // Write all pages to disk
  console.log("\n💾 Writing files...\n")

  // Generate lit-loader.js
  const litLoader = generateLitLoader(renderOptions)
  await fs.writeFile(path.join(outDir, "lit-loader.js"), litLoader, "utf-8")

  const app = generateApp(store, renderedPages)
  await fs.writeFile(path.join(outDir, "app.js"), app, "utf-8")

  const main = generateMain()
  await fs.writeFile(path.join(outDir, "main.js"), main, "utf-8")

  for (const { page, html } of renderedPages) {
    const filePath = await writePageToDisk(page.path, html, outDir)
    console.log(`  ✓ ${filePath}`)
  }

  // Bundle with Vite
  console.log("\n📦 Bundling with Vite...\n")
  const viteConfig = createViteConfig({ rootDir, outDir })
  await viteBuild(viteConfig)

  // Remove bundled files
  console.log("\n🧹 Cleaning up...\n")
  await fs.rm(path.join(outDir, "lit-loader.js"))
  await fs.rm(path.join(outDir, "app.js"))

  console.log("\n✨ Build complete!\n")

  return { pages: renderedPages.length, outDir }
}

async function generateStore(rootDir = "src", pages = []) {
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

async function generatePages(store, pages, renderOptions) {
  const renderedPages = []

  for (const page of pages) {
    console.log(`  Rendering ${page.path}...`)

    const module = await import(pathToFileURL(page.filePath))
    const html = await renderPage(store, module, {
      ...renderOptions,
      wrap: true,
    })
    renderedPages.push({ page, module, html })
  }

  return renderedPages
}

/**
 * Write a page to disk with proper directory structure.
 */
async function writePageToDisk(pagePath, html, outDir = "dist") {
  // Convert URL path to file path
  // / -> dist/index.html
  // /about -> dist/about/index.html
  // /blog/post-1 -> dist/blog/post-1/index.html

  // Remove leading slash
  const cleanPath = pagePath.replace(/^\//, "")
  const filePath = path.join(outDir, cleanPath, "index.html")

  // Ensure directory exists
  await fs.mkdir(path.dirname(filePath), { recursive: true })

  // Write file
  await fs.writeFile(filePath, html, "utf-8")

  return filePath
}
