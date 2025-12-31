#!/usr/bin/env node
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { Command } from "commander"

import { build } from "../src/build.js"
import { dev } from "../src/dev.js"

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
  .option("-r, --root <dir>", "source root directory", "src")
  .option("-p, --port <port>", "dev server port", 3000)
  .option("-t, --title <title>", "default page title", "My Site")
  .option("--styles <styles...>", "CSS files to include")
  .option("--scripts <scripts...>", "JS files to include")
  .action(async (options) => {
    const cwd = process.cwd()

    try {
      await dev({
        rootDir: path.resolve(cwd, options.root),
        port: Number(options.port),
        renderOptions: {
          title: options.title,
          meta: {},
          styles: options.styles || [],
          scripts: options.scripts || [],
        },
      })
    } catch (error) {
      console.error("Dev server failed:", error)
      process.exit(1)
    }
  })

program
  .command("build")
  .description("Build static site from pages directory")
  .option("-r, --root <dir>", "source root directory", "src")
  .option("-o, --out <dir>", "output directory", "dist")
  .option("-t, --title <title>", "default page title", "My Site")
  .option("--styles <styles...>", "CSS files to include")
  .option("--scripts <scripts...>", "JS files to include")
  .action(async (options) => {
    const cwd = process.cwd()

    try {
      await build({
        rootDir: path.resolve(cwd, options.root),
        outDir: path.resolve(cwd, options.out),
        renderOptions: {
          title: options.title,
          meta: {},
          styles: options.styles || [],
          scripts: options.scripts || [],
        },
      })
    } catch (error) {
      console.error("Build failed:", error)
      process.exit(1)
    }
  })

program.parse()
