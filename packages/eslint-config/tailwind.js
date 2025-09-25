import { defineConfig } from "eslint/config"
import tailwind from "eslint-plugin-tailwindcss"

import reactConfig from "./react.js"

export default defineConfig([
  ...reactConfig,

  tailwind.configs["flat/recommended"],
])
