import fs from "node:fs/promises"
import path from "node:path"

/**
 * Generates an RSS feed for the site.
 *
 * @param {Array<Object>} pages - Array of page objects. Each page must have a `metadata` property.
 * @param {Object} options - RSS generation options.
 * @param {string} [options.outDir="dist"] - Output directory.
 * @param {string} [options.title="RSS Feed"] - Feed title.
 * @param {string} [options.description="Latest Posts"] - Feed description.
 * @param {string} options.link - Site URL (required).
 * @param {string} [options.feedPath="/feed.xml"] - Path for the RSS file.
 * @param {string} [options.language="en"] - Feed language.
 * @param {string} [options.copyright] - Copyright notice.
 * @param {number} [options.maxItems=50] - Maximum items to include.
 * @param {Function} [options.filter] - Function to filter pages.
 * @returns {Promise<void>}
 */
export async function generateRSS(pages = [], options = {}) {
  const {
    outDir = "dist",
    title = "RSS Feed",
    description = "Latest Posts",
    link = "",
    feedPath = "/feed.xml",
    language = "en",
    copyright = "",
    maxItems = 50,
    filter = () => true,
  } = options

  if (!link) {
    console.warn("⚠️  No link provided for RSS feed, skipping...")
    return
  }

  const items = pages
    .filter(filter)
    .map(({ metadata }) => metadata)
    .sort(byNewest)
    .slice(0, maxItems)

  const rssItems = items.map(createRenderItem(link))

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(link)}</link>
    <description>${escapeXml(description)}</description>
    <language>${language}</language>
    ${copyright ? `<copyright>${escapeXml(copyright)}</copyright>` : ""}
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(link + feedPath)}" rel="self" type="application/rss+xml" />
${rssItems.join("\n")}
  </channel>
</rss>`

  const feedFilePath = path.join(outDir, feedPath.replace(/^\//, ""))
  await fs.mkdir(path.dirname(feedFilePath), { recursive: true })
  await fs.writeFile(feedFilePath, xml, "utf-8")

  console.log(`  ✓ ${feedPath} (${items.length} items)\n`)
}

/**
 * Creates a function to render a single RSS item.
 *
 * @param {string} link - The base URL of the site.
 * @returns {Function} A function that takes metadata and returns an XML string.
 */
function createRenderItem(link) {
  return (metadata) => {
    const pubDate =
      metadata.pubDate || metadata.date
        ? new Date(metadata.pubDate || metadata.date).toUTCString()
        : new Date().toUTCString()

    const guid = metadata.guid || `${link}${metadata.path}`

    return `    <item>
      <title>${escapeXml(metadata.title)}</title>
      <link>${escapeXml(link + metadata.path)}</link>
      <guid>${escapeXml(guid)}</guid>
      <pubDate>${pubDate}</pubDate>
      ${metadata.description ? `<description>${escapeXml(metadata.description)}</description>` : ""}
      ${metadata.author ? `<author>${escapeXml(metadata.author)}</author>` : ""}
      ${metadata.category ? `<category>${escapeXml(metadata.category)}</category>` : ""}
    </item>`
  }
}

/**
 * Escape special XML characters.
 *
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeXml(str) {
  if (typeof str !== "string") return str
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/**
 * Sorts items by date (newest first).
 *
 * @param {Object} a - First item.
 * @param {Object} b - Second item.
 * @returns {number} Sort order.
 */
function byNewest(a, b) {
  const dateA = new Date(a.pubDate || a.date || 0)
  const dateB = new Date(b.pubDate || b.date || 0)
  return dateB - dateA
}
