#!/usr/bin/env node
import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { Command } from "commander"
import { Window } from "happy-dom"

import { patchRandom } from "../src/random.js"

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
  .command("build")
  .description("Build static site from pages directory")
  .option("-p, --pages <dir>", "pages directory", "pages")
  .option("-o, --out <dir>", "output directory", "dist")
  .option("-s, --seed <seed>", "seed for random number generator", 42)
  .option("-t, --title <title>", "default page title", "My Site")
  .option("--styles <styles...>", "CSS files to include")
  .option("--scripts <scripts...>", "JS files to include")
  .action(async (options) => {
    const cwd = process.cwd()
    const seed = Number(options.seed)

    try {
      // 1️⃣ Install DOM *before anything else*
      const window = new Window()

      globalThis.window = window
      globalThis.document = window.document
      globalThis.HTMLElement = window.HTMLElement
      globalThis.Node = window.Node
      globalThis.Comment = window.Comment

      // Optional but sometimes needed
      globalThis.customElements = window.customElements

      // 3️⃣ Patch with the parsed seed
      console.log("Using seed:", seed)
      const restore = patchRandom(seed)
      await import("@inglorious/web")
      restore()

      // 4️⃣ NOW import and run build
      const { build } = await import("../src/build.js")

      await build({
        pagesDir: path.resolve(cwd, options.pages),
        outDir: path.resolve(cwd, options.out),
        renderOptions: {
          seed,
          title: options.title,
          metas: [],
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
