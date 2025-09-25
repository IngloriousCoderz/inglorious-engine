import { defineConfig } from "eslint/config"
import globals from "globals"

import baseConfig from "./base.js"

export default defineConfig([
  ...baseConfig,

  {
    languageOptions: { globals: globals.browser },
  },
])
