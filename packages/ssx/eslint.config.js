import nodeConfig from "@inglorious/eslint-config/node"
import { defineConfig } from "eslint/config"

export default defineConfig([
  ...nodeConfig,

  {
    files: ["**/*.js"],
    rules: {
      "no-magic-numbers": "off",
      "no-console": "off",
    },
  },
])
