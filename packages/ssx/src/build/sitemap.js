import fs from "node:fs/promises"
import path from "node:path"

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
export async function generateSitemap(pages = [], options = {}) {
  const { outDir = "dist", hostname = "", filter = () => true } = options

  if (!hostname) {
    console.warn("⚠️  No hostname provided for sitemap, skipping...")
    return
  }

  const items = pages.filter(filter).map(({ metadata }) => metadata)

  // Build XML
  const urls = items.map(renderItem)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`

  const sitemapPath = path.join(outDir, "sitemap.xml")
  await fs.writeFile(sitemapPath, xml, "utf-8")

  console.log(`  ✓ sitemap.xml (${items.length} pages)\n`)
}

function renderItem(metadata) {
  return `  <url>
    <loc>${escapeXml(metadata.loc)}</loc>
    <lastmod>${metadata.lastmod}</lastmod>
    <changefreq>${metadata.changefreq}</changefreq>
    <priority>${metadata.priority}</priority>
  </url>`
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
