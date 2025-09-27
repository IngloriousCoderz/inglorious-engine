import nodeConfig from "@inglorious/eslint-config/node"
import storybookConfig from "@inglorious/eslint-config/storybook"
import tailwindConfig from "@inglorious/eslint-config/tailwind"
import { defineConfig } from "eslint/config"

export default defineConfig([
  ...nodeConfig,
  ...tailwindConfig,
  ...storybookConfig,
])
