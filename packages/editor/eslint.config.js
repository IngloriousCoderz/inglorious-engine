import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import reactPlugin from "eslint-plugin-react"
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort"
import storybook from "eslint-plugin-storybook"
import tailwind from "eslint-plugin-tailwindcss"
import globals from "globals"

export default defineConfig([
  globalIgnores(["storybook-static"]),
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

  tailwind.configs["flat/recommended"],

  ...storybook.configs["flat/recommended"],
  {
    ignores: ["!.storybook"],
    files: ["**/*.test.js", "**/*.stories.js"],
    rules: {
      "no-magic-numbers": "off",
    },
  },

  // Config files are Node.js modules, not browser scripts.
  {
    files: [".storybook/main.js", "*.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
])
