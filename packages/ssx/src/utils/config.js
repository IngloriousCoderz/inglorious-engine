import path from "node:path"
import { pathToFileURL } from "node:url"

export async function loadConfig(options) {
  const { rootDir = "src", configPath = "site.config.js" } = options

  try {
    const config = await import(pathToFileURL(path.join(rootDir, configPath)))
    return config.default || config
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      return {} // Default config
    }
    throw error
  }
}
