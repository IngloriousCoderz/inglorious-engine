import path from "node:path"

import { mergeConfig } from "vite"

export function createViteConfig(options = {}) {
  const { rootDir = "src", publicDir = "public", vite = {} } = options
  const { port = 3000 } = vite.dev ?? {}

  return mergeConfig(
    {
      root: process.cwd(),
      publicDir: path.resolve(process.cwd(), rootDir, publicDir),
      server: { port, middlewareMode: true },
      appType: "custom",
      plugins: [virtualPlugin()],
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), rootDir),
        },
      },
    },
    vite,
  )
}

export const virtualFiles = new Map()

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
