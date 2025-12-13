import browserConfig from "@inglorious/eslint-config/browser"
import nodeConfig from "@inglorious/eslint-config/node"
import { defineConfig } from "eslint/config"

export default defineConfig([...browserConfig, ...nodeConfig])
