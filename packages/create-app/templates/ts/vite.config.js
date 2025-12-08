import { defineConfig } from "vite"

export default defineConfig({
  // @see https://github.com/vitejs/vite/issues/1973
  define: { "process.env": {} },

  plugins: [],
})
