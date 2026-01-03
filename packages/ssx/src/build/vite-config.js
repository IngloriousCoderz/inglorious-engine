import path from "node:path"

import { mergeConfig } from "vite"

// import { minifyTemplateLiterals } from "rollup-plugin-minify-template-literals"

/**
 * Generate Vite config for building the client bundle
 */
export function createViteConfig(options = {}) {
  const {
    rootDir = "src",
    outDir = "dist",
    publicDir = "public",
    vite = {},
  } = options

  return mergeConfig(
    {
      root: rootDir,
      publicDir: path.resolve(process.cwd(), rootDir, publicDir),
      // plugins: [minifyTemplateLiterals()], // TODO: minification breaks hydration. The footprint difference is minimal after all
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
              if (id.includes("node_modules")) {
                return "lib"
              }
            },
          },
        },
      },
      resolve: {
        alias: {
          "@": path.resolve(process.cwd(), rootDir),
        },
      },
    },
    vite,
  )
}
