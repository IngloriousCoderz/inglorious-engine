import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

import { build as viteBuild } from "vite"

import { loadConfig } from "../config.js"
import { renderPage } from "../render/index.js"
import { getPages } from "../router/index.js"
import { generateApp } from "../scripts/app.js"
import { generateStore } from "../store.js"
import { copyPublicDir } from "./public.js"
import { createViteConfig } from "./vite-config.js"

export async function build(options = {}) {
  const config = await loadConfig(options)

  const mergedOptions = { ...config, ...options }
  const { rootDir = "src", outDir = "dist" } = mergedOptions

  console.log("🔨 Starting build...\n")

  // 1. Clean and create output directory
  await fs.rm(outDir, { recursive: true, force: true })
  await fs.mkdir(outDir, { recursive: true })

  // 2. Copy public assets before generating pages (could be useful if need to read `public/data.json`)
  await copyPublicDir(options)

  // 3. Get all pages to build
  const pages = await getPages(path.join(rootDir, "pages"))
  console.log(`📄 Found ${pages.length} pages to build\n`)

  // 4. Generate store with all types and initial entities
  const store = await generateStore(pages, mergedOptions)

  // 5. Render all pages
  const htmls = await renderPages(store, pages, mergedOptions)

  // 6. Generate client-side JavaScript
  console.log("\n💾 Writing files...\n")

  const app = generateApp(store, pages)
  await fs.writeFile(path.join(outDir, "main.js"), app, "utf-8")

  // 7. Write HTML pages
  pages.forEach(async (page, index) => {
    const html = htmls[index]
    const filePath = await writePageToDisk(page.path, html, outDir)
    console.log(`  ✓ ${filePath}`)
  })

  // 8. Bundle with Vite
  console.log("\n📦 Bundling with Vite...\n")
  const viteConfig = createViteConfig(mergedOptions)
  await viteBuild(viteConfig)

  // 9. Cleanup
  // console.log("\n🧹 Cleaning up...\n")

  console.log("\n✨ Build complete!\n")

  return { pages: htmls.length, outDir }
}

async function renderPages(store, pages, options = {}) {
  const renderedPages = []

  for (const page of pages) {
    console.log(`  Rendering ${page.path}...`)

    const module = await import(pathToFileURL(page.filePath))
    const html = await renderPage(store, page, module, {
      ...options,
      wrap: true,
    })
    renderedPages.push(html)
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
