/**
 * Generate the code that goes inside the <!-- SSX --> marker.
 * This creates the types and entities objects for the client-side store.
 */
export function generateApp(store, renderedPages) {
  // Collect all unique page modules and their exports
  const routeEntries = renderedPages.map(
    ({ page }) =>
      `      "${page.path}": () => import("@/pages/${page.modulePath}")`,
  )

  return `import { createDevtools, createStore, mount } from "@inglorious/web"
import { router } from "@inglorious/web/router"

const types = { router }

const entities = {
  router: {
    type: "router",
    routes: {
${routeEntries.join(",\n")}
    }
  },
${JSON.stringify(store.getState(), null, 2).slice(1, -1)}
}

const middlewares = []
// if (import.meta.env.DEV) {
  middlewares.push(createDevtools().middleware)
// }

const store = createStore({ types, entities, middlewares })

const root = document.getElementById("root")
root.innerHTML = ""

mount(store, (api) => {
  const { route } = api.getEntity("router")
  return api.render(route, { allowType: true })
}, root)`
}
