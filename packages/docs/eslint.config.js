import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import reactPlugin from "eslint-plugin-react"
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort"
import globals from "globals"

export default defineConfig([
  globalIgnores(["dist", "storybook-static"]),
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
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

  {
    files: ["**/*.test.js", "src/**/*.js"],
    rules: {
      "no-magic-numbers": "off",
    },
  },
])
