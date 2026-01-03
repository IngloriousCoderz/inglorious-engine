import path from "node:path"

import connect from "connect"
import { createServer } from "vite"

import { loadConfig } from "../config.js"
import { renderPage } from "../render/index.js"
import { getPages } from "../router/index.js"
import { generateApp } from "../scripts/app.js"
import { generateStore } from "../store.js"
import { createViteConfig, virtualFiles } from "./vite-config.js"

export async function dev(options = {}) {
  const config = await loadConfig(options)

  const mergedOptions = { ...config, ...options }
  const { rootDir = "src" } = mergedOptions

  console.log("🚀 Starting dev server...\n")

  // Get all pages once at startup
  const pages = await getPages(path.join(rootDir, "pages"))
  console.log(`📄 Found ${pages.length} pages\n`)

  // Generate store config once for all pages
  const store = await generateStore(pages, mergedOptions)

  // Create Vite dev server
  const viteConfig = createViteConfig(mergedOptions)
  const viteServer = await createServer(viteConfig)

  // Use Vite's middleware first (handles HMR, static files, etc.)
  const connectServer = connect()

  connectServer.use(viteServer.middlewares)

  // Add SSR middleware
  connectServer.use(async (req, res, next) => {
    const [url] = req.url.split("?")

    try {
      // Skip special routes, static files, AND public assets
      if (
        url.startsWith("/@") ||
        url.includes(".") || // Vite handles static files
        url === "/favicon.ico"
      ) {
        return next() // Let Vite serve it
      }

      // Find matching page
      const page = pages.find((p) => matchRoute(p.path, url))
      if (!page) return next()

      const module = await viteServer.ssrLoadModule(page.filePath)
      const html = await renderPage(store, page, module, {
        ...mergedOptions,
        wrap: true,
        isDev: true,
      })

      const app = generateApp(store, pages)
      virtualFiles.set("/main.js", app)

      res.setHeader("Content-Type", "text/html")
      res.end(html)
    } catch (error) {
      viteServer.ssrFixStacktrace(error)
      next(error) // Let Vite handle the error overlay
    }
  })

  const { port = 3000 } = viteConfig.server ?? {}
  const server = connectServer.listen(port)

  console.log(`\n✨ Dev server running at http://localhost:${port}\n`)
  console.log("Press Ctrl+C to stop\n")

  return {
    close: () => {
      server.close()
      viteServer.close()
    },
  }
}

// Simple route matcher (could be moved to router.js)
function matchRoute(pattern, url) {
  const patternParts = pattern.split("/").filter(Boolean)
  const urlParts = url.split("/").filter(Boolean)

  if (patternParts.length !== urlParts.length) {
    return false
  }

  return patternParts.every((part, i) => {
    if (part.startsWith(":") || part.startsWith("[")) {
      return true
    }
    return part === urlParts[i]
  })
}
