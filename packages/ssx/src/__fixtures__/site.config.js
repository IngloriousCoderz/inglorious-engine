const env = process.env.NODE_ENV

export default {
  // Basic metadata
  lang: "en",
  charset: "UTF-8",
  title: "My Awesome Site",

  // Meta tags (applied to all pages unless overridden)
  meta: {
    description: "A site built with SSX",
    "og:type": "website",
    "og:site_name": "My Site",
    "twitter:card": "summary_large_image",
  },

  // Global assets
  styles: ["./styles/reset.css", "./styles/theme.css"],

  ...(env === "production" && { scripts: ["./scripts/analytics.js"] }),

  // Custom layout wrapper
  layout: (body, options) => {
    const {
      lang = "en",
      charset = "UTF-8",
      title = "",
      meta = {},
      styles = [],
      head = "",
      scripts = [],
      isDev,
    } = options

    return `
      <!DOCTYPE html>
      <html lang=${lang}>
        <head>
          <meta charset=${charset} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>${title}</title>
          ${Object.entries(meta)
            .map(
              ([name, content]) => `<meta name="${name}" content="${content}">`,
            )
            .join("\n")}
          ${styles
            .map((href) => `<link rel="stylesheet" href="${href}">`)
            .join("\n")}
          ${head}
        </head>
        <body>
          <header>
            <nav>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/blog">Blog</a>
            </nav>
          </header>

          <main>
            <div id="root">${body}</div>
          </main>

          <footer>
            <p>&copy; 2026 My Site</p>
          </footer>

          ${isDev ? `<script type="module" src="/@vite/client"></script>` : ``}
          <script type="module" src="/main.js"></script>
          ${scripts
            .map((src) => `<script type="module" src="${src}"></script>`)
            .join("\n")}
        </body>
      </html>
    `
  },

  // Or simpler: just wrap the content
  // wrapper: (body) => html`
  //   <div class="site-wrapper">
  //     <header>...</header>
  //     ${body}
  //     <footer>...</footer>
  //   </div>
  // `,

  // Build options
  basePath: "/", // Base URL for the site
  rootDir: "src",
  outDir: "dist",
  publicDir: "public", // Static assets copied as-is
  favicon: "/favicon.ico",

  sitemap: {
    hostname: "https://mysite.com",
    exclude: ["/admin", "/draft-*"],
  },

  rss: {
    enabled: true,
    title: "My Blog",
    description: "Latest posts",
    feed: "/feed.xml",
    items: (pages) => pages.filter((page) => page.path.startsWith("/blog")),
  },

  redirects: [
    { from: "/old-path", to: "/new-path", status: 301 },
    { from: "/blog/*", to: "/posts/:splat", status: 301 },
  ],

  // Router config (optional)
  router: {
    trailingSlash: false, // /about vs /about/
    scrollBehavior: "smooth", // smooth scroll on navigation
  },

  // Vite config passthrough
  vite: {
    // Dev server options
    dev: {
      port: 3000,
      open: true, // Open browser on start
    },
    plugins: [],
  },

  hooks: {
    beforeBuild: async (config) => {
      console.log(`Starting build on ${config.rootDir}...`)
    },
    afterBuild: async (result) => {
      console.log(`Built ${result.pages} pages`)
    },
    onPageBuild: async (page) => {
      console.log(`Built ${page.path}`)
    },
  },
}
