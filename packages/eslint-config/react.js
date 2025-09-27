import { defineConfig } from "eslint/config"
import reactPlugin from "eslint-plugin-react"

import browserConfig from "./browser.js"

export default defineConfig([
  ...browserConfig,

  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off",
    },
  },
])
