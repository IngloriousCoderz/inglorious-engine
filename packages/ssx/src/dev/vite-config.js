import path from "node:path"

import { mergeConfig } from "vite"

import { markdownPlugin } from "../utils/markdown.js"

/**
 * Creates a Vite configuration object for the SSX dev server.
 * It sets up the root directory, public directory, aliases, and the virtual file plugin.
 *
 * @param {Object} options - SSX configuration options.
 * @param {string} [options.rootDir="src"] - The source root directory.
 * @param {string} [options.publicDir="public"] - The public assets directory (relative to rootDir).
 * @param {Object} [options.vite={}] - Additional Vite configuration to merge.
 * @returns {Object} The merged Vite configuration.
 */
export function createViteConfig(options = {}) {
  const {
    rootDir = "src",
    publicDir = "public",
    vite = {},
    markdown = {},
  } = options
  const { port = 3000 } = vite.dev ?? {}

  return mergeConfig(
    {
      root: process.cwd(),
      publicDir: path.resolve(process.cwd(), rootDir, publicDir),
      server: { port, middlewareMode: true },
      appType: "custom",
      plugins: [virtualPlugin(), markdownPlugin(markdown)],
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), rootDir),
        },
      },
    },
    vite,
  )
}

/**
 * A map to store virtual files generated during runtime (e.g., the client entry point).
 * Keys are file paths (e.g., "/main.js") and values are the file content.
 * @type {Map<string, string>}
 */
export const virtualFiles = new Map()

/**
 * A Vite plugin to serve virtual files from the `virtualFiles` map.
 *
 * @returns {Object} The Vite plugin object.
 */
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
