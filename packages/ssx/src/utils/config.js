import path from "node:path"
import { pathToFileURL } from "node:url"

export async function loadConfig(options) {
  const { rootDir = ".", configPath = "site.config.js" } = options
  const srcDir = path.join(rootDir, "src")

  try {
    const config = await import(pathToFileURL(path.join(srcDir, configPath)))
    return config.default || config
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      return {} // Default config
    }
    throw error
  }
}
