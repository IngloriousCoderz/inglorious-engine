import fs from "node:fs/promises"
import path from "node:path"

import { createGetPageOption } from "../page-options.js"

const DEFAULT_OPTIONS = {}

/**
 * Generates a sitemap.xml file for the built site.
 * @param {Array} pages - Array of page objects with path, updatedAt, etc.
 * @param {Object} options - Sitemap generation options
 * @param {string} options.outDir - Output directory (default: "dist")
 * @param {string} options.hostname - Base URL of the site (e.g., "https://mysite.com")
 * @param {Array} options.exclude - Array of path patterns to exclude (e.g., ["/admin", "/draft-*"])
 * @param {Object} options.defaults - Default values for all pages
 * @returns {Promise<void>}
 */
export async function generateSitemap(store, pages = [], options = {}) {
  const {
    outDir = "dist",
    hostname = "",
    exclude = [],
    defaults = {
      changefreq: "weekly",
      priority: 0.5,
    },
  } = options

  if (!hostname) {
    console.warn("⚠️  No hostname provided for sitemap, skipping...")
    return
  }

  // Filter out excluded pages
  const filteredPages = pages.filter(({ path }) => {
    return !exclude.some((pattern) => {
      if (pattern.includes("*")) {
        // Wildcard pattern
        const regex = new RegExp(
          "^" + pattern.replace(/\*/g, ".*").replace(/\//g, "\\/") + "$",
        )
        return regex.test(path)
      }

      // Exact match
      return path === pattern
    })
  })

  // Build XML
  const urls = filteredPages.map(({ path, module }) => {
    const getPageOption = createGetPageOption(store, module)

    const updatedAt = getPageOption("updatedAt", DEFAULT_OPTIONS)
    const changefreq = getPageOption("changefreq", DEFAULT_OPTIONS)
    const priority = getPageOption("priority", DEFAULT_OPTIONS)

    const loc = `${hostname}${path}`
    const lastmod = updatedAt
      ? new Date(updatedAt).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq ?? defaults.changefreq}</changefreq>
    <priority>${priority ?? defaults.priority}</priority>
  </url>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`

  const sitemapPath = path.join(outDir, "sitemap.xml")
  await fs.writeFile(sitemapPath, xml, "utf-8")

  console.log(`  ✓ sitemap.xml (${filteredPages.length} pages)\n`)
}

/**
 * Escape special XML characters
 */
function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
