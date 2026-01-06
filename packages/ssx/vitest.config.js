import { defineConfig } from "vitest/config"

import { markdownPlugin } from "./src/utils/markdown.js"

export default defineConfig({
  plugins: [markdownPlugin()],
  test: {
    environment: "happy-dom",
  },
})
