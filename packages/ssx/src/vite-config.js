import path from "node:path"

/**
 * Generate Vite config for building the client bundle
 */
export function createViteConfig(options = {}) {
  const { rootDir = "src", outDir = "dist" } = options

  return {
    root: process.cwd(),
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
