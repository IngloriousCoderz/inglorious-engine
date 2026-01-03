import fs from "node:fs/promises"
import path from "node:path"

export async function copyPublicDir(options = {}) {
  const { outDir = "dist", publicDir = "public" } = options

  // Copy public directory to dist
  const publicPath = path.join(process.cwd(), publicDir)
  const publicExists = await fs
    .access(publicPath)
    .then(() => true)
    .catch(() => false)

  if (publicExists) {
    console.log("📁 Copying public assets...\n")
    await copyDir(publicPath, outDir)
  }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}
