#!/usr/bin/env node

import { execSync } from "child_process"
import fs from "fs"
import { EOL } from "os"
import path from "path"
import prompts from "prompts"
import { fileURLToPath } from "url"

const INDENTATION = 2

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const templatesRoot = path.join(__dirname, "../templates")
  const templateNames = fs.readdirSync(templatesRoot)

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
        choices: templateNames.map((name) => ({ title: name, value: name })),
      },
    ],
    { onCancel },
  )

  if (canceled) {
    console.log("Operation canceled.")
    return
  }

  const targetDir = path.join(process.cwd(), projectName)
  const templateDir = path.join(templatesRoot, template)

  // Create project directory and copy template files
  copyDir(templateDir, targetDir)

  // Update package.json with project name
  const pkgPath = path.join(targetDir, "package.json")
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"))
  pkg.name = projectName

  function getLatestVersion(packageName) {
    try {
      const version = execSync(`npm view ${packageName} version`, {
        encoding: "utf-8",
      }).trim()
      return `^${version}`
    } catch {
      return "latest" // fallback
    }
  }

  for (const depType of ["dependencies", "devDependencies"]) {
    if (pkg[depType]) {
      for (const [name, version] of Object.entries(pkg[depType])) {
        if (version.startsWith("workspace:")) {
          pkg[depType][name] = getLatestVersion(name)
        }
      }
    }
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, INDENTATION) + EOL)

  // Update README.md with project name
  const readmePath = path.join(targetDir, "README.md")
  if (fs.existsSync(readmePath)) {
    let readme = fs.readFileSync(readmePath, "utf-8")
    readme = readme.replace(/^# .*/, `# ${projectName}`)
    fs.writeFileSync(readmePath, readme)
  }

  console.log(`✅ Created ${projectName} at ${targetDir}`)
  console.log(`\nNext steps:`)
  console.log(`  cd ${projectName}`)
  console.log(`  pnpm install`)
  console.log(`  pnpm dev`)

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
}

main().catch((e) => {
  console.error(e)
})
