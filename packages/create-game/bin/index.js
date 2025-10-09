#!/usr/bin/env node

import { execSync } from "child_process"
import fs from "fs"
import ora from "ora"
import { EOL } from "os"
import path from "path"
import prompts from "prompts"
import { fileURLToPath } from "url"

const INDENTATION = 2

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const templatesRoot = path.join(__dirname, "../templates")

  let canceled = false

  const onCancel = () => {
    canceled = true
    return false
  }

  const { projectName, template } = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: "What is your project named?",
        initial: "my-game",
      },
      {
        type: "select",
        name: "template",
        message: "Select a template",
        choices: [
          {
            title: "Minimal",
            description: "A single HTML file for a zero-build setup",
            value: "minimal",
          },
          {
            title: "JavaScript",
            description: "A vanilla JavaScript setup with Vite",
            value: "js",
          },
          {
            title: "TypeScript",
            description: "A TypeScript setup with Vite",
            value: "ts",
          },
          {
            title: "IngloriousScript (JS)",
            description:
              "A JS superset with built-in vector math, powered by Vite",
            value: "ijs",
          },
          {
            title: "IngloriousScript (TS)",
            description:
              "A TS superset with built-in vector math, powered by Vite",
            value: "its",
          },
        ],
      },
    ],
    { onCancel },
  )

  if (canceled) {
    console.log("Operation canceled.")
    return
  }

  const spinner = ora(`Creating project "${projectName}"...`).start()

  try {
    const targetDir = path.join(process.cwd(), projectName)
    const templateDir = path.join(templatesRoot, template)

    // Create project directory and copy template files
    copyDir(templateDir, targetDir)

    // Update README.md with project name
    const readmePath = path.join(targetDir, "README.md")
    if (fs.existsSync(readmePath)) {
      let readme = fs.readFileSync(readmePath, "utf-8")
      readme = readme.replace(/# my-game/, `# ${projectName}`)
      fs.writeFileSync(readmePath, readme)
    }

    if (template === "minimal") {
      spinner.succeed(`Created ${projectName} at ${targetDir}`)
      console.log(`\nNext steps:`)
      console.log(`  cd ${projectName}`)
      console.log(`  Open index.html in your browser`)
    } else {
      // Update package.json with project name
      const pkgPath = path.join(targetDir, "package.json")
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
      pkg.name = projectName

      for (const depType of ["dependencies", "devDependencies"]) {
        if (pkg[depType]) {
          for (const [name, version] of Object.entries(pkg[depType])) {
            if (version.startsWith("workspace:")) {
              spinner.text = `Fetching latest version of ${name}...`
              pkg[depType][name] = getLatestVersion(name)
            }
          }
        }
      }

      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, INDENTATION) + EOL)

      spinner.succeed(`Created ${projectName} at ${targetDir}`)
      console.log(`\nNext steps:`)
      console.log(`  cd ${projectName}`)
      console.log(`  pnpm install`)
      console.log(`  pnpm dev`)
    }
  } catch (error) {
    spinner.fail("Operation failed.")
    console.error(error)
  }

  function copyDir(src, dest) {
    fs.mkdirSync(dest, { recursive: true })

    const entries = fs.readdirSync(src, { withFileTypes: true })

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)

      // Rename gitignore to .gitignore
      if (entry.name === "gitignore") {
        fs.copyFileSync(srcPath, path.join(dest, ".gitignore"))
        continue
      }

      if (entry.isDirectory()) {
        copyDir(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }

  function getLatestVersion(packageName) {
    try {
      const version = execSync(`npm view ${packageName} version`, {
        encoding: "utf-8",
        stdio: "pipe", // Prevent npm view output from cluttering the console
      }).trim()
      return `^${version}`
    } catch {
      return "latest" // fallback
    }
  }
}

main().catch((e) => {
  console.error(e)
})
