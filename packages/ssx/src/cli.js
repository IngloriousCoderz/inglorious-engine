import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { Command } from "commander"

import { build } from "../src/build.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read package.json for version
const packageJson = JSON.parse(
  await readFile(path.join(__dirname, "../package.json"), "utf-8"),
)

const program = new Command()

program
  .name("ssx")
  .description("Static Site Generation for @inglorious/web")
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

    try {
      await build({
        pagesDir: path.resolve(cwd, options.pages),
        outDir: path.resolve(cwd, options.out),
        renderOptions: {
          seed: options.seed,
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
