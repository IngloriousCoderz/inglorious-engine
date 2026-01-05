import fs from "node:fs/promises"
import path from "node:path"

import { build as viteBuild } from "vite"

import { loadConfig } from "../config.js"
import { getPages } from "../router/index.js"
import { generateApp } from "../scripts/app.js"
import { generateStore } from "../store.js"
import {
  createManifest,
  determineRebuildPages,
  hashEntities,
  loadManifest,
  saveManifest,
} from "./manifest.js"
import { generatePages } from "./pages.js"
import { copyPublicDir } from "./public.js"
import { generateRSS } from "./rss.js"
import { generateSitemap } from "./sitemap.js"
import { createViteConfig } from "./vite-config.js"

export async function build(options = {}) {
  const config = await loadConfig(options)

  const mergedOptions = { ...config, ...options }
  const {
    rootDir = "src",
    outDir = "dist",
    incremental = true,
    clean = false,
    sitemap,
    rss,
  } = mergedOptions

  console.log("🔨 Starting build...\n")

  // Load previous build manifest
  const manifest = incremental && !clean ? await loadManifest(outDir) : null

  // 1. Clean and create output directory
  if (clean || !manifest) {
    // Clean output directory if forced or first build
    await fs.rm(outDir, { recursive: true, force: true })
    await fs.mkdir(outDir, { recursive: true })
  } else {
    // Ensure output directory exists
    await fs.mkdir(outDir, { recursive: true })
  }

  // 2. Copy public assets before generating pages (could be useful if need to read `public/data.json`)
  await copyPublicDir(options)

  // 3. Get all pages to build
  const allPages = await getPages(path.join(rootDir, "pages"))
  console.log(`📄 Found ${allPages.length}\n`)

  // Determine which pages need rebuilding
  const entitiesHash = await hashEntities(rootDir)
  let pagesToBuild = allPages
  let pagesToSkip = []

  if (manifest) {
    const result = await determineRebuildPages(allPages, manifest, entitiesHash)
    pagesToBuild = result.pagesToBuild
    pagesToSkip = result.pagesToSkip

    if (pagesToSkip.length) {
      console.log(
        `⚡ Incremental build: ${pagesToBuild.length} to change, ${pagesToSkip.length} to skip\n`,
      )
    }
  }

  // 4. Generate store with all types and initial entities
  const store = await generateStore(allPages, mergedOptions)

  // 5. Render only pages that changed
  const generatedPages = await generatePages(store, pagesToBuild, mergedOptions)
  // For skipped pages, load their metadata from disk if needed for sitemap/RSS
  const skippedPages = await generatePages(store, pagesToSkip, {
    ...mergedOptions,
    shouldGenerateHtml: false,
  })

  // Combine rendered and skipped pages for sitemap/RSS
  const allGeneratedPages = [...generatedPages, ...skippedPages]

  if (generatedPages.length) {
    // 6. Generate client-side JavaScript
    console.log("\n💾 Writing files...\n")

    // 7. Write HTML pages
    for (const page of generatedPages) {
      const filePath = await writePageToDisk(page.path, page.html, outDir)
      console.log(`  ✓ ${filePath}`)
    }
  }

  // Always regenerate client-side JavaScript (it's cheap and ensures consistency)
  console.log("\n📝 Generating client scripts...\n")

  const app = generateApp(store, allPages)
  await fs.writeFile(path.join(outDir, "main.js"), app, "utf-8")
  console.log(`  ✓ main.js\n`)

  // 7a. Generate sitemap if enabled
  if (sitemap?.hostname) {
    console.log("\n🗺️  Generating sitemap.xml...\n")
    await generateSitemap(allGeneratedPages, { outDir, ...sitemap })
  }

  // 7b. Generate RSS feed if enabled
  if (rss?.link) {
    console.log("\n📡 Generating RSS feed...\n")
    await generateRSS(allGeneratedPages, { outDir, ...rss })
  }

  // 8. Bundle with Vite
  console.log("\n📦 Bundling with Vite...\n")
  const viteConfig = createViteConfig(mergedOptions)
  await viteBuild(viteConfig)

  // 9. Cleanup
  // console.log("\n🧹 Cleaning up...\n")

  // Save manifest for next build
  if (incremental) {
    const newManifest = await createManifest(allGeneratedPages, entitiesHash)
    await saveManifest(outDir, newManifest)
  }

  console.log("\n✨ Build complete!\n")

  return {
    generated: generatedPages.length,
    skipped: skippedPages.length,
  }
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
