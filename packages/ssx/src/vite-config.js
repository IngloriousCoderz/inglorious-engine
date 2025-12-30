import path from "node:path"

import { minifyTemplateLiterals } from "rollup-plugin-minify-template-literals"

/**
 * Generate Vite config for building the client bundle
 */
export function createViteConfig(options = {}) {
  const { rootDir = "src", outDir = "dist" } = options

  return {
    root: process.cwd(),
    plugins: [minifyTemplateLiterals()],
    build: {
      outDir,
      emptyOutDir: false, // Don't delete HTML files we already generated
      rollupOptions: {
        input: {
          main: path.resolve(outDir, "main.js"),
        },
        output: {
          entryFileNames: "[name].js",
          chunkFileNames: "[name].[hash].js",
          assetFileNames: "[name].[ext]",
          manualChunks(id) {
            // if (id.includes("node_modules/@inglorious")) return "inglorious"
            if (id.includes("node_modules")) return "vendor"
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), rootDir),
      },
    },
  }
}
