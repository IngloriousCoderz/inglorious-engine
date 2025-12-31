/* eslint-disable no-unused-vars */

/**
 * Generate the code that goes inside the <!-- SSX --> marker.
 * This creates the types and entities objects for the client-side store.
 */
export function generateApp(store, pages) {
  // Collect all unique page modules and their exports
  const routes = pages.map(
    (page) =>
      `      "${page.path}": () => import("@/pages/${page.modulePath}")`,
  )

  return `import { createDevtools, createStore, mount } from "@inglorious/web"
import { router } from "@inglorious/web/router"

const pages = ${JSON.stringify(pages.map(({ filePath, ...page }) => page))}
const path = window.location.pathname + window.location.search + window.location.hash
const page = pages.find((page) => page.path === path)

const types = { router }

const entities = {
  router: {
    type: "router",
    routes: {
${routes.join(",\n")}
    },
  },
${JSON.stringify(store.getState(), null, 2).slice(1, -1)}
}

const middlewares = []
if (import.meta.env.DEV) {
  middlewares.push(createDevtools().middleware)
}

const module = await entities.router.routes[page.path]()

types.router.path = page.path
types.router.route = page.moduleName

const type = module[page.moduleName]
types[page.moduleName] = type
entities.router.routes[page.path] = page.moduleName

const store = createStore({ types, entities, middlewares })

const root = document.getElementById("root")

mount(store, (api) => {
  const { route } = api.getEntity("router")
  return api.render(route, { allowType: true })
}, root)
`
}
