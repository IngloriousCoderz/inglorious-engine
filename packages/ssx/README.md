# @inglorious/ssx

[![NPM version](https://img.shields.io/npm/v/@inglorious/ssx.svg)](https://www.npmjs.com/package/@inglorious/ssx)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Static Site Xecution** - Build blazing-fast static sites with [@inglorious/web](https://www.npmjs.com/package/@inglorious/web), complete with server-side rendering, client-side hydration, and zero-config routing.

SSX takes your entity-based web apps and generates optimized static HTML with full hydration support. Think Next.js SSG or Astro, but with the simplicity and predictability of Inglorious Web's entity architecture.

---

## Why SSX?

### ⚡️ Fast by Default

- **Pre-rendered HTML** - Every page is built at compile time
- **Instant load times** - No waiting for server responses
- **CDN-ready** - Deploy anywhere static files are served
- **Perfect Lighthouse scores** - SEO and performance out of the box

### 🎯 Simple Architecture

- **No server required** - Pure static files
- **No complex build configs** - Convention over configuration
- **File-based routing** - Pages are just files in `src/pages/`
- **Entity-based state** - Same familiar patterns from @inglorious/web

### 🔥 Modern DX

- **Hot reload dev server** - See changes instantly
- **Lazy-loaded routes** - Code splitting automatically
- **lit-html hydration** - Interactive UI without the bloat
- **TypeScript ready** - Full type support (coming soon)

### 🚀 Production Ready

- **Automatic code splitting** - Per-page bundles
- **Optimized builds** - Minified, tree-shaken output
- **Source maps** - Debug production like development
- **Error boundaries** - Graceful failure handling

---

## Quick Start

### Installation

```bash
npm install @inglorious/ssx @inglorious/web
```

### Create Your First Site

<!-- ```bash
npx @inglorious/create-app my-site --template ssx
cd my-site
npm run dev
```

Or manually: -->

```javascript
// src/pages/index.js
import { html } from "@inglorious/web"

export const index = {
  render() {
    return html`
      <div>
        <h1>Welcome to SSX!</h1>
        <p>This page was pre-rendered at build time.</p>
        <nav>
          <a href="/about">About</a>
        </nav>
      </div>
    `
  },
}

export const metadata = {
  title: "Home",
  meta: {
    description: "Welcome to our site",
    "og:image": "/og-image.png",
  },
}
```

### Development

```bash
npm run dev
# → Dev server at http://localhost:3000
```

### Build

```bash
npm run build
# → Static site in dist/
```

### Deploy

```bash
npm run preview
# → Preview production build
```

Deploy `dist/` to:

- **Vercel** - Zero config
- **Netlify** - Drop folder
- **GitHub Pages** - Push and done
- **Cloudflare Pages** - Instant edge
- **Any CDN** - It's just files!

---

## Features

### �️ Sitemap & RSS Generation

SSX automatically generates `sitemap.xml` and `rss.xml` based on your pages. Configure them in `src/site.config.js`:

```javascript
export default {
  // Basic metadata
  title: "My Awesome Site",
  meta: {
    description: "A site built with SSX",
    "og:type": "website",
    "og:site_name": "My Site",
  },

  // Sitemap configuration
  sitemap: {
    hostname: "https://myblog.com",
    filter: (page) => !["/admin", "/draft-*", "/test"].includes(page.pattern),
    defaults: {
      changefreq: "weekly",
      priority: 0.5,
    },
  },

  // RSS configuration
  rss: {
    title: "My Blog",
    description: "Latest posts from my blog",
    link: "https://myblog.com",
    feedPath: "/feed.xml",
    language: "en",
    copyright: "© 2026 My Blog",
    maxItems: 10,
    filter: (page) => page.path.startsWith("/posts/"),
  },
}
```

Pages with a `published` date in metadata are included in RSS feeds.

### �📁 File-Based Routing

Your file structure defines your routes:

```
src/pages/
├── index.js          → /
├── about.js          → /about
├── blog.js          → /blog
└── posts/
    └── _slug.js        → /posts/:slug
```

Dynamic routes use underscore prefix: `_id.js`, `_slug.js`, etc.

### ⚛️ Entity-Based State And Behavior

```javascript
// src/pages/about.js
import { html } from "@inglorious/web"

export const about = {
  click(entity) {
    entity.name += "!"
  },

  render(entity, api) {
    return html`<h1>
      About
      <span @click=${() => api.notify(`#${entity.id}:click`)}
        >${entity.name}</span
      >
    </h1>`
  },
}
```

```javascript
// src/entities.js
export const entities = {
  about: {
    type: "about",
    name: "Us",
  },
}
```

### 🔄 Data Loading

Load data at build time with the `load` export:

```javascript
// src/pages/blog.js
import { html } from "@inglorious/web"

export const blog = {
  render(entity) {
    return html`
      <h1>Blog Posts</h1>
      <ul>
        ${entity.posts?.map(
          (post) => html`
            <li>
              <a href="/posts/${post.id}">${post.title}</a>
            </li>
          `,
        )}
      </ul>
    `
  },
}

// SSR: Load data during build
export async function load(entity) {
  const response = await fetch("https://api.example.com/posts")
  entity.posts = await response.json()
}

export const title = "Blog"
```

The `load` function runs on the server during build. Data is serialized into the HTML and available immediately on the client.

### 🎨 Dynamic Routes with `staticPaths`

Generate multiple pages from data:

```javascript
// src/pages/posts/_slug.js
import { html } from "@inglorious/web"

export const post = {
  render(entity) {
    return html`
      <article>
        <h1>${entity.post.title}</h1>
        <div>${entity.post.body}</div>
      </article>
    `
  },
}

// Load data for a specific post
export async function load(entity, page) {
  const response = await fetch(
    `https://api.example.com/posts/${page.params.slug}`,
  )
  entity.post = await response.json()
}

// Tell SSX which pages to generate
export async function staticPaths() {
  const response = await fetch(`https://api.example.com/posts`)
  const posts = await response.json()

  return posts.map((post) => ({
    params: { slug: post.slug },
    path: `/posts/${post.slug}`,
  }))
}

export const metadata = (entity) => ({
  title: entity.post.title ?? "Post",
  meta: {
    description: entity.post.excerpt,
  },
})
```

### 📄 Page Metadata

Export metadata for HTML `<head>`. The `metadata` export can be a plain object or a function:

```javascript
export const index = {
  render() {
    return html`<h1>Home</h1>`
  },
}

// Static metadata
export const metadata = {
  title: "My Site",
  meta: {
    description: "An awesome static site",
    "og:image": "/og-image.png",
  },
}

// Or dynamic metadata (uses entity data)
export const metadata = (entity) => ({
  title: `${entity.user.name}'s Profile`,
  meta: {
    description: entity.user.bio,
    "og:image": entity.user.avatar,
  },
})
```

### 🔥 Client-Side Hydration

Pages hydrate automatically with lit-html. Interactivity works immediately:

```javascript
export const counter = {
  click(entity) {
    entity.count++
  },

  render(entity, api) {
    return html`
      <div>
        <p>Count: ${entity.count}</p>
        <button @click=${() => api.notify(`#${entity.id}:click`)}>
          Increment
        </button>
      </div>
    `
  },
}
```

The HTML is pre-rendered on the server. When JavaScript loads, lit-html hydrates the existing DOM and wires up event handlers. No flash of unstyled content, no duplicate rendering.

### 🧭 Client-Side Navigation

After hydration, navigation is instant:

```javascript
// Links navigate without page reload
;<a href="/about">About</a> // Client-side routing

// Programmatic navigation
api.notify("navigate", "/posts")

// With options
api.notify("navigate", {
  to: "/posts/123",
  replace: true,
})
```

Routes are lazy-loaded on demand, keeping initial bundle size small.

---

## CLI

SSX provides a simple CLI for building and developing:

### `ssx build`

Builds your static site:

```bash
ssx build [options]

Options:
  -c, --config <file>  Config file (default: "site.config.js")
  -r, --root <dir>     Source root directory (default: "src")
  -o, --out <dir>      Output directory (default: "dist")
  -i, --incremental    Enable incremental builds (default: true)
  -f, --force          Force clean build, ignore cache
```

### `ssx dev`

Starts development server with hot reload:

```bash
ssx dev [options]

Options:
  -c, --config <file>  Config file (default: "site.config.js")
  -r, --root <dir>     Source root directory (default: "src")
  -p, --port <port>    Dev server port (default: 3000)
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "ssx dev",
    "build": "ssx build",
    "preview": "pnpm dlx serve dist"
  }
}
```

---

## Project Structure

```
my-site/
├── src/
│   ├── pages/          # File-based routes
│   │   ├── index.js    # Home page
│   │   ├── about.js    # About page
│   │   └── posts/
│   │       ├── index.js    # /posts
│   │       └── _id.js      # /posts/:id
│   ├── entities.js     # Entity definitions
│   └── types/          # Custom entity types (optional)
├── dist/               # Build output
├── package.json
└── site.config.js      # Site configuration
```

---

## Comparison to Other Tools

| Feature                 | SSX         | Next.js (SSG) | Astro  | Eleventy |
| ----------------------- | ----------- | ------------- | ------ | -------- |
| Pre-rendered HTML       | ✅          | ✅            | ✅     | ✅       |
| Client hydration        | ✅ lit-html | ✅ React      | ✅ Any | ❌       |
| Client routing          | ✅          | ✅            | ✅     | ❌       |
| Lazy loading            | ✅          | ✅            | ✅     | ❌       |
| Entity-based state      | ✅          | ❌            | ❌     | ❌       |
| No compilation required | ✅          | ❌            | ❌     | ✅       |
| Zero config             | ✅          | ❌            | ❌     | ❌       |
| Framework agnostic      | ❌          | ❌            | ✅     | ✅       |

SSX is perfect if you:

- Want static site performance
- Love entity-based architecture
- Prefer convention over configuration
- Need full client-side interactivity
- Don't want React/Vue lock-in

---

## Advanced Usage

### Site Configuration

Customize SSX behavior in `src/site.config.js`:

```javascript
export default {
  // Basic metadata
  lang: "en",
  charset: "UTF-8",
  title: "My Awesome Site",
  meta: {
    description: "A site built with SSX",
    "og:type": "website",
  },

  // Global assets
  styles: ["./styles/reset.css", "./styles/theme.css"],
  scripts: ["./scripts/analytics.js"],

  // Build options
  basePath: "/",
  rootDir: "src",
  outDir: "dist",
  publicDir: "public",
  favicon: "/favicon.ico",

  // Router config
  router: {
    trailingSlash: false,
    scrollBehavior: "smooth",
  },

  // Vite config passthrough
  vite: {
    server: {
      port: 3000,
      open: true,
    },
  },

  // Build hooks
  hooks: {
    beforeBuild: async (config) => console.log("Starting build..."),
    afterBuild: async (result) => console.log(`Built ${result.pages} pages`),
  },
}
```

### Environment Variables

Use Vite's environment variables:

```javascript
// Access in your code
const apiUrl = import.meta.env.VITE_API_URL

// .env file
VITE_API_URL=https://api.example.com
```

### Custom 404 Page

Create a fallback route:

```javascript
// src/pages/404.js
export const notFound = {
  render() {
    return html`
      <div>
        <h1>404 - Page Not Found</h1>
        <a href="/">Go Home</a>
      </div>
    `
  },
}

export const metadata = {
  title: "404",
}
```

Register it in your router:

```javascript
// src/entities.js
import { setRoutes } from "@inglorious/web/router"

setRoutes({
  // ... other routes
  "*": "notFound", // Fallback
})
```

### Incremental Builds

SSX enables incremental builds by default. Only changed pages are rebuilt, dramatically speeding up your build process:

```bash
ssx build
# Only changed pages are rebuilt

ssx build --force
# Force a clean rebuild of all pages
```

Incremental builds respect your page dependencies and invalidate cache when dependencies change.

---

## API Reference

### Build API

```javascript
import { build } from "@inglorious/ssx/build"

await build({
  rootDir: "src",
  outDir: "dist",
  configFile: "site.config.js",
  incremental: true,
  clean: false,
})
```

### Dev Server API

```javascript
import { dev } from "@inglorious/ssx/dev"

await dev({
  rootDir: "src",
  port: 3000,
  configFile: "site.config.js",
})
```

---

<!-- ## Examples

Check out these example projects:

- **[Basic Blog](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/ssx-blog)** - Simple blog with posts
- **[Documentation Site](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/ssx-docs)** - Multi-page docs
- **[E-commerce](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/ssx-shop)** - Product catalog
- **[Portfolio](https://github.com/IngloriousCoderz/inglorious-forge/tree/main/examples/ssx-portfolio)** - Personal portfolio

--- -->

## Roadmap

- [ ] TypeScript support
- [ ] Image optimization
- [ ] API routes (serverless functions)
- [ ] MDX support
- [ ] i18n helpers

---

## Philosophy

SSX embraces the philosophy of [@inglorious/web](https://www.npmjs.com/package/@inglorious/web):

- **Simplicity over cleverness** - Obvious beats clever
- **Convention over configuration** - Sensible defaults
- **Predictability over magic** - Explicit is better than implicit
- **Standards over abstractions** - Use the platform

Static site generation should be simple. SSX makes it simple.

---

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](../../CONTRIBUTING.md) first.

---

## License

**MIT License** - Free and open source

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

---

## Related Packages

- [@inglorious/web](https://www.npmjs.com/package/@inglorious/web) - Entity-based web framework
- [@inglorious/store](https://www.npmjs.com/package/@inglorious/store) - State management
- [@inglorious/engine](https://www.npmjs.com/package/@inglorious/engine) - Game engine

---

## Support

- 📖 [Documentation](https://inglorious-engine.vercel.app)
- 💬 [Discord Community](https://discord.gg/Byx85t2eFp)
- 🐛 [Issue Tracker](https://github.com/IngloriousCoderz/inglorious-forge/issues)
- 📧 [Email Support](mailto:antony.mistretta@gmail.com)

---

**Build static sites the Inglorious way. Simple. Predictable. Fast.** 🚀
