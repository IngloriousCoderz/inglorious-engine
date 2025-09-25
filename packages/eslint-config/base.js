import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort"

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    extends: ["js/recommended"],
    plugins: { js },
  },
  {
    rules: {
      "no-console": "error",
      "no-magic-numbers": "warn",
      "no-unused-vars": "warn",
    },
  },

  {
    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },

  {
    files: ["**/*.test.js"],
    rules: {
      "no-magic-numbers": "off",
    },
  },
])
