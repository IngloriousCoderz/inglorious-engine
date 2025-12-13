import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  // @see https://github.com/vitejs/vite/issues/1973
  define: { "process.env": {} },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
