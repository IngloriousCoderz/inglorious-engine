import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@inglorious/engine/": "/src/engine/",
      "@inglorious/renderers/": "/src/renderers/",
    },
  },
})
