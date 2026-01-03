import fs from "node:fs/promises"
import path from "node:path"

import { createGetPageOption } from "../page-options.js"

const DEFAULT_OPTIONS = {
  title: "",
  meta: {},
  pubDate: "",
  author: "",
  category: "",
  changefreq: "weekly",
  priority: 0.5,
  updatedAt: "",
}

/**
 * Generates an RSS feed for the site.
 * @param {Object} options - RSS generation options
 * @param {string} options.outDir - Output directory (default: "dist")
 * @param {Array} options.items - Array of items to include in the feed
 * @param {string} options.title - Feed title
 * @param {string} options.description - Feed description
 * @param {string} options.link - Site URL
 * @param {string} options.feedPath - Path for the RSS file (default: "/feed.xml")
 * @param {string} options.language - Feed language (default: "en")
 * @param {string} options.copyright - Copyright notice
 * @param {number} options.maxItems - Maximum items to include (default: 50)
 * @returns {Promise<void>}
 */
export async function generateRSS(store, pages, options = {}) {
  const {
    outDir = "dist",
    title = "RSS Feed",
    meta = {},
    link = "",
    feedPath = "/feed.xml",
    language = "en",
    copyright = "",
    maxItems = 50,
  } = options

  if (!link) {
    console.warn("⚠️  No link provided for RSS feed, skipping...")
    return
  }

  const items = pages.map(({ module }) => {
    const getPageOption = createGetPageOption(store, module)

    return {
      title: getPageOption("title", DEFAULT_OPTIONS),
      meta: getPageOption("meta", DEFAULT_OPTIONS),
      pubDate: getPageOption("pubDate", DEFAULT_OPTIONS),
      author: getPageOption("author", DEFAULT_OPTIONS),
      category: getPageOption("category", DEFAULT_OPTIONS),
      changefreq: getPageOption("changefreq", DEFAULT_OPTIONS),
      priority: getPageOption("priority", DEFAULT_OPTIONS),
      updatedAt: getPageOption("updatedAt", DEFAULT_OPTIONS),
    }
  })

  // Sort items by date (newest first) and limit
  const sortedItems = [...items]
    .sort((a, b) => {
      const dateA = new Date(a.pubDate || a.date || 0)
      const dateB = new Date(b.pubDate || b.date || 0)
      return dateB - dateA
    })
    .slice(0, maxItems)

  // Build RSS items
  const rssItems = sortedItems.map((item) => {
    const pubDate =
      item.pubDate || item.date
        ? new Date(item.pubDate || item.date).toUTCString()
        : new Date().toUTCString()

    const guid = item.guid || `${link}${item.path}`

    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(link + item.path)}</link>
      <guid>${escapeXml(guid)}</guid>
      <pubDate>${pubDate}</pubDate>
      ${item.description ? `<description>${escapeXml(item.description)}</description>` : ""}
      ${item.author ? `<author>${escapeXml(item.author)}</author>` : ""}
      ${item.category ? `<category>${escapeXml(item.category)}</category>` : ""}
    </item>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(link)}</link>
    <description>${escapeXml(meta.description)}</description>
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

  console.log(`  ✓ ${feedPath} (${sortedItems.length} items)\n`)
}

/**
 * Escape special XML characters
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
