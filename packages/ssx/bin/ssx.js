#!/usr/bin/env node
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

    try {
      await dev({
        ...options,
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
  .action(async (options) => {
    const cwd = process.cwd()

    try {
      await build({
        ...options,
        rootDir: path.resolve(cwd, options.root),
        outDir: path.resolve(cwd, options.out),
      })
    } catch (error) {
      console.error("Build failed:", error)
      process.exit(1)
    }
  })

program.parse()
