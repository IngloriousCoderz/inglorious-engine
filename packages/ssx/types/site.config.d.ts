/**
 * Represents a page being built or processed.
 */
export interface Page {
  /**
   * The final URL path for the page (e.g., "/about").
   */
  path: string
  /**
   * The route pattern that matched this page (e.g., "/posts/:id").
   */
  pattern: string
  /**
   * The absolute file path to the source component.
   */
  filePath: string
  [key: string]: any
}

/**
 * Options passed to the layout function.
 */
export interface LayoutOptions {
  /**
   * The language attribute for the <html> tag.
   */
  lang?: string
  /**
   * The character encoding.
   */
  charset?: string
  /**
   * The page title.
   */
  title?: string
  /**
   * Meta tags to include in <head>.
   */
  meta?: Record<string, string>
  /**
   * Stylesheets to include.
   */
  styles?: string[]
  /**
   * Additional HTML to inject into <head>.
   */
  head?: string
  /**
   * Scripts to include.
   */
  scripts?: string[]
  /**
   * Whether the build is running in development mode.
   */
  isDev?: boolean
  [key: string]: any
}

/**
 * Configuration for the sitemap generation.
 */
export interface SitemapConfig {
  /**
   * The base hostname for the sitemap URLs (e.g., "https://example.com").
   */
  hostname: string
  /**
   * A function to filter which pages are included in the sitemap.
   */
  filter?: (page: Page) => boolean
  /**
   * Default values for sitemap entries.
   */
  defaults?: {
    /**
     * How frequently the page is likely to change.
     */
    changefreq?: string
    /**
     * The priority of this URL relative to other URLs on your site.
     */
    priority?: number
    /**
     * The date of last modification.
     */
    lastmod?: string | Date
  }
}

/**
 * Configuration for the RSS feed generation.
 */
export interface RssConfig {
  /**
   * The title of the RSS feed.
   */
  title: string
  /**
   * The description of the RSS feed.
   */
  description: string
  /**
   * The link to the site associated with the feed.
   */
  link: string
  /**
   * The output path for the RSS feed file.
   * @default "/feed.xml"
   */
  feedPath?: string
  /**
   * The language of the feed.
   */
  language?: string
  /**
   * Copyright notice for content in the feed.
   */
  copyright?: string
  /**
   * Maximum number of items to include in the feed.
   */
  maxItems?: number
  /**
   * A function to filter which pages are included in the feed.
   */
  filter?: (page: Page) => boolean
}

/**
 * Configuration for a URL redirect.
 */
export interface RedirectConfig {
  /**
   * The source path or pattern to redirect from.
   */
  from: string
  /**
   * The destination path to redirect to.
   */
  to: string
  /**
   * The HTTP status code for the redirect.
   * @default 301
   */
  status?: number
}

/**
 * Configuration for the client-side router.
 */
export interface RouterConfig {
  /**
   * Whether to enforce trailing slashes on URLs.
   */
  trailingSlash?: boolean
  /**
   * The scroll behavior when navigating between pages.
   */
  scrollBehavior?: "auto" | "smooth"
}

/**
 * Result object passed to the afterBuild hook.
 */
export interface BuildResult {
  /**
   * The total number of pages generated.
   */
  pages: number
  [key: string]: any
}

/**
 * Lifecycle hooks for the build process.
 */
export interface SSXHooks {
  /**
   * Called before the build process starts.
   */
  beforeBuild?: (config: SiteConfig) => Promise<void> | void
  /**
   * Called after the build process completes.
   */
  afterBuild?: (result: BuildResult) => Promise<void> | void
  /**
   * Called after an individual page is built.
   */
  onPageBuild?: (page: Page) => Promise<void> | void
}

/**
 * Main configuration object for SSX.
 */
export interface SiteConfig {
  /**
   * The language attribute for the <html> tag.
   * @default "en"
   */
  lang?: string
  /**
   * The character encoding for the site.
   * @default "UTF-8"
   */
  charset?: string
  /**
   * The default title for pages.
   */
  title?: string
  /**
   * Default meta tags to be applied to all pages.
   * Keys are meta names/properties, values are content.
   */
  meta?: Record<string, string>
  /**
   * List of CSS file paths or URLs to include globally.
   */
  styles?: string[]
  /**
   * List of JavaScript file paths or URLs to include globally.
   */
  scripts?: string[]
  /**
   * A function that renders the full HTML document structure.
   * Receives the page body and options.
   */
  layout?: (body: string, options: LayoutOptions) => string
  /**
   * A function to wrap the page content before layout.
   * Useful for adding common UI elements like headers/footers around the content.
   */
  wrapper?: (body: any) => any
  /**
   * The base URL path for the application.
   * @default "/"
   */
  basePath?: string
  /**
   * The directory containing source files.
   * @default "src"
   */
  rootDir?: string
  /**
   * The directory where build artifacts will be output.
   * @default "dist"
   */
  outDir?: string
  /**
   * The directory containing static assets to be copied to the output.
   * @default "public"
   */
  publicDir?: string
  /**
   * Path to the favicon file.
   */
  favicon?: string
  /**
   * Configuration for generating a sitemap.xml.
   */
  sitemap?: SitemapConfig
  /**
   * Configuration for generating an RSS feed.
   */
  rss?: RssConfig
  /**
   * List of redirect rules.
   */
  redirects?: RedirectConfig[]
  /**
   * Configuration for the client-side router.
   */
  router?: RouterConfig
  /**
   * Configuration options passed directly to Vite.
   */
  vite?: Record<string, any>
  /**
   * Lifecycle hooks for the build process.
   */
  hooks?: SSXHooks
}
