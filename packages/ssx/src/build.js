import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

import { build as viteBuild } from "vite"

import { renderPage } from "./render.js"
import { getPages } from "./router.js"
import { generateApp } from "./scripts/app.js"
import { generateStore } from "./store.js"
import { createViteConfig } from "./vite-config.js"

export async function build(options = {}) {
  const { rootDir = "src", outDir = "dist" } = options

  console.log("🔨 Starting build...\n")

  // Clean output directory
  await fs.rm(outDir, { recursive: true, force: true })
  await fs.mkdir(outDir, { recursive: true })

  // Get all pages to build
  const pages = await getPages(path.join(rootDir, "pages"))
  console.log(`📄 Found ${pages.length} pages to build\n`)

  // Render all pages
  const renderedPages = await generatePages(pages, options)

  // Write all pages to disk
  console.log("\n💾 Writing files...\n")

  // Generate store config once for all pages
  const store = await generateStore(pages, options)

  const app = generateApp(store, pages)
  await fs.writeFile(path.join(outDir, "main.js"), app, "utf-8")

  for (const { page, html } of renderedPages) {
    const filePath = await writePageToDisk(page.path, html, outDir)
    console.log(`  ✓ ${filePath}`)
  }

  // Bundle with Vite
  console.log("\n📦 Bundling with Vite...\n")
  const viteConfig = createViteConfig({ rootDir, outDir })
  await viteBuild(viteConfig)

  // Remove bundled files
  // console.log("\n🧹 Cleaning up...\n")

  console.log("\n✨ Build complete!\n")

  return { pages: renderedPages.length, outDir }
}

async function generatePages(pages, options = {}) {
  const { renderOptions } = options

  const renderedPages = []

  for (const page of pages) {
    console.log(`  Rendering ${page.path}...`)

    const store = await generateStore([page], options)
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
