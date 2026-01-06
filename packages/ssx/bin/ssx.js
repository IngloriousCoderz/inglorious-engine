#!/usr/bin/env node
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { Command } from "commander"

import { build } from "../src/build/index.js"
import { dev } from "../src/dev/index.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read package.json for version
const packageJson = JSON.parse(
  await readFile(path.join(__dirname, "../package.json"), "utf-8"),
)

const program = new Command()

program
  .name("ssx")
  .description("Static Site Xecution for @inglorious/web")
  .version(packageJson.version)

program
  .command("dev")
  .description("Start development server with hot reload")
  .option("-c, --config <file>", "config file", "site.config.js")
  .option("-r, --root <dir>", "source root directory", "src")
  .option("-p, --port <port>", "dev server port", 3000)
  .action(async (options) => {
    const cwd = process.cwd()
    const config = resolveConfigFile(options.config)

    try {
      await dev({
        ...options,
        config,
        rootDir: path.resolve(cwd, options.root),
        port: Number(options.port),
      })
    } catch (error) {
      console.error("Dev server failed:", error)
      process.exit(1)
    }
  })

program
  .command("build")
  .description("Build site from pages directory")
  .option("-c, --config <file>", "config file", "site.config.js")
  .option("-r, --root <dir>", "source root directory", "src")
  .option("-o, --out <dir>", "output directory", "dist")
  .option("-i, --incremental", "enable incremental builds", true)
  .option("-f, --force", "force clean build (ignore cache)", false)
  .action(async (options) => {
    const cwd = process.cwd()
    const config = resolveConfigFile(options.config)

    try {
      await build({
        ...options,
        config,
        rootDir: path.resolve(cwd, options.root),
        outDir: path.resolve(cwd, options.out),
        incremental: options.incremental, // Enabled by default
        clean: options.force,
      })

      // if (result.skipped) {
      //   console.log(
      //     `\n⚡ Incremental build saved time by skipping ${result.skipped} unchanged pages`,
      //   )
      // }
    } catch (error) {
      console.error("Build failed:", error)
      process.exit(1)
    }
  })

program.parse()

function resolveConfigFile(configFile) {
  if (configFile === "site.config.js") {
    const jsPath = path.resolve(process.cwd(), "site.config.js")
    const tsPath = path.resolve(process.cwd(), "site.config.ts")

    if (!existsSync(jsPath) && existsSync(tsPath)) {
      return "site.config.ts"
    }
  }
  return configFile
}
