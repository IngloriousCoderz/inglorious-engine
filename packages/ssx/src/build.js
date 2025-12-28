import fs from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

import { build as viteBuild } from "vite"

import { renderPage } from "./render.js"
import { getPages } from "./router.js"
import { store } from "./store.js"
import { createViteConfig } from "./vite-config.js"

export async function build(options = {}) {
  const { pagesDir = "pages", outDir = "dist", renderOptions = {} } = options

  console.log("🔨 Starting build...\n")

  // Clean output directory
  await fs.rm(outDir, { recursive: true, force: true })
  await fs.mkdir(outDir, { recursive: true })

  // Get all pages to build
  const pages = await getPages(pagesDir)
  console.log(`📄 Found ${pages.length} pages to build\n`)

  // Render all pages
  const renderedPages = []
  for (const page of pages) {
    console.log(`  Rendering ${page.path}...`)

    const module = await import(pathToFileURL(page.filePath))
    const html = await renderPage(module, { ...renderOptions, wrap: true })
    renderedPages.push({ page, module, html })
  }

  // Generate lit-loader.js
  const litLoader = generateLitLoader(renderOptions)
  await fs.writeFile(path.join(outDir, "lit-loader.js"), litLoader, "utf-8")

  // Generate store config once for all pages
  const app = generateApp(store, renderedPages)
  await fs.writeFile(path.join(outDir, "app.js"), app, "utf-8")

  const main = generateMain()
  await fs.writeFile(path.join(outDir, "main.js"), main, "utf-8")

  // Write all pages to disk
  console.log("\n💾 Writing files...\n")

  for (const { page, html } of renderedPages) {
    const filePath = await writePageToDisk(page.path, html, outDir)
    console.log(`  ✓ ${filePath}`)
  }

  // Bundle with Vite
  console.log("\n📦 Bundling with Vite...\n")
  const viteConfig = createViteConfig({ pagesDir, outDir })
  await viteBuild(viteConfig)

  console.log("\n✨ Build complete!\n")

  return { pages: renderedPages.length, outDir }
}

function generateLitLoader(options = {}) {
  return `let seed = ${options.seed}
let mode = "seeded"

const originalRandom = Math.random
Math.random = random

await import("@inglorious/web")

Math.random = originalRandom
mode = "normal"

function random() {
  if (mode === "seeded") {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  return originalRandom()
}
`
}

/**
 * Generate the code that goes inside the <!-- SSX --> marker.
 * This creates the types and entities objects for the client-side store.
 */
function generateApp(store, renderedPages) {
  // Collect all unique page modules and their exports
  const pageImports = new Map()
  const routeEntries = []

  for (const { page, module } of renderedPages) {
    // Convert file path to import path
    // about.js -> /about.js
    const importPath = "@/" + page.modulePath

    const [exportName] = Object.keys(module) // TODO: this is brittle, and doesn't work when getStaticPaths is present

    pageImports.set(importPath, exportName)

    // Map route path to entity type name
    routeEntries.push(`      '${page.path}': '${exportName}'`)
  }

  // Generate import statements
  const imports = Array.from(pageImports.entries())
    .map(
      ([importPath, exportName]) =>
        `import { ${exportName} } from '${importPath}'`,
    )
    .join("\n")

  // Generate routes object
  const routes = routeEntries.join(",\n")

  // Generate type registrations
  const typeEntries = Array.from(pageImports.values())
    .map((name) => `  ${name}`)
    .join(",\n")

  return `import { createDevtools, createStore, mount, router } from "@inglorious/web"
${imports}

const types = {
  router,
${typeEntries}
}

const entities = {
  router: {
    type: 'router',
    routes: {
${routes}
    }
  },
${JSON.stringify(store.getState(), null, 2).slice(1, -1)}
}

const middlewares = []
if (import.meta.env.DEV) {
  middlewares.push(createDevtools().middleware)
}

const store = createStore({ types, entities, middlewares })

const root = document.getElementById("root")
root.innerHTML = ""

mount(store, (api) => {
  const { route } = api.getEntity("router")
  return api.render(route, { allowType: true })
}, root)`
}

function generateMain() {
  return `import "./lit-loader.js"
await import("./app.js")
`
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
