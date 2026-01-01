import path from "node:path"

import connect from "connect"
import { createServer } from "vite"

import { renderPage } from "./render.js"
import { getPages } from "./router.js"
import { generateApp } from "./scripts/app.js"
import { generateStore } from "./store.js"

export async function dev(options = {}) {
  const { rootDir = "src", port = 3000, renderOptions = {} } = options

  console.log("🚀 Starting dev server...\n")

  // Get all pages once at startup
  const pages = await getPages(path.join(rootDir, "pages"))
  console.log(`📄 Found ${pages.length} pages\n`)

  // Generate store config once for all pages
  const store = await generateStore(pages, options)

  // Create Vite dev server
  const viteServer = await createServer({
    root: process.cwd(),
    server: { port, middlewareMode: true },
    appType: "custom",
    plugins: [virtualPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), rootDir),
      },
    },
  })

  // Use Vite's middleware first (handles HMR, static files, etc.)
  const connectServer = connect()

  connectServer.use(viteServer.middlewares)

  // Add SSR middleware
  connectServer.use(async (req, res, next) => {
    const [url] = req.url.split("?")

    try {
      // Find matching page
      const page = pages.find((p) => matchRoute(p.path, url))
      if (!page) return next()

      const module = await viteServer.ssrLoadModule(page.filePath)
      const html = await renderPage(store, page, module, {
        ...renderOptions,
        wrap: true,
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

const virtualFiles = new Map()

function virtualPlugin() {
  return {
    name: "ssx-virtual-files",

    resolveId(id) {
      if (virtualFiles.has(id)) return id
    },

    load(id) {
      if (virtualFiles.has(id)) return virtualFiles.get(id)
    },
  }
}
