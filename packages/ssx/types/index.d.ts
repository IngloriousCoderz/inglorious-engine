import type { UserConfig } from "vite"

export interface SiteConfig {
  /** Site title */
  title?: string
  /** HTML lang attribute */
  lang?: string
  /** HTML charset */
  charset?: string
  /** Meta tags */
  meta?: Record<string, string>

  /** Global styles to inject */
  styles?: string[]
  /** Global scripts to inject */
  scripts?: string[]

  /** Source root directory (default: "src") */
  rootDir?: string
  /** Output directory (default: "dist") */
  outDir?: string
  /** Public directory (default: "public") */
  publicDir?: string
  /** Base path for the site */
  basePath?: string
  /** Favicon path */
  favicon?: string

  /** Router configuration */
  router?: {
    trailingSlash?: boolean
    scrollBehavior?: "auto" | "smooth"
  }

  /** Vite configuration */
  vite?: UserConfig

  /** Markdown configuration */
  markdown?: {
    /** Highlight.js theme (default: "github-dark") */
    theme?: string
  }

  /** Sitemap configuration */
  sitemap?: {
    hostname: string
    filter?: (page: any) => boolean
    defaults?: {
      changefreq?: string
      priority?: number
    }
  }

  /** RSS configuration */
  rss?: {
    title: string
    description: string
    link: string
    feedPath?: string
    language?: string
    copyright?: string
    maxItems?: number
    filter?: (page: any) => boolean
  }

  /** Build hooks */
  hooks?: {
    beforeBuild?: (config: SiteConfig) => Promise<void> | void
    afterBuild?: (result: any) => Promise<void> | void
  }
}
