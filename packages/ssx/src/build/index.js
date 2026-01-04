import fs from "node:fs/promises"
import path from "node:path"

import { build as viteBuild } from "vite"

import { loadConfig } from "../config.js"
import { getPages } from "../router/index.js"
import { generateApp } from "../scripts/app.js"
import { generateStore } from "../store.js"
import { generatePages } from "./pages.js"
import { copyPublicDir } from "./public.js"
import { generateRSS } from "./rss.js"
import { generateSitemap } from "./sitemap.js"
import { createViteConfig } from "./vite-config.js"

export async function build(options = {}) {
  const config = await loadConfig(options)

  const mergedOptions = { ...config, ...options }
  const { rootDir = "src", outDir = "dist", sitemap, rss } = mergedOptions

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
  const generatedPages = await generatePages(store, pages, mergedOptions)

  // 6. Generate client-side JavaScript
  console.log("\n💾 Writing files...\n")

  const app = generateApp(store, generatedPages)
  await fs.writeFile(path.join(outDir, "main.js"), app, "utf-8")

  // 7. Write HTML pages
  for (const page of generatedPages) {
    const filePath = await writePageToDisk(page.path, page.html, outDir)
    console.log(`  ✓ ${filePath}`)
  }

  // 7a. Generate sitemap if enabled
  if (sitemap?.hostname) {
    console.log("\n🗺️  Generating sitemap.xml...\n")
    await generateSitemap(generatedPages, { outDir, ...sitemap })
  }

  // 7b. Generate RSS feed if enabled
  if (rss?.link) {
    console.log("\n📡 Generating RSS feed...\n")
    await generateRSS(generatedPages, { outDir, ...rss })
  }

  // 8. Bundle with Vite
  console.log("\n📦 Bundling with Vite...\n")
  const viteConfig = createViteConfig(mergedOptions)
  await viteBuild(viteConfig)

  // 9. Cleanup
  // console.log("\n🧹 Cleaning up...\n")

  console.log("\n✨ Build complete!\n")

  return { pages: generatedPages.length, outDir }
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
