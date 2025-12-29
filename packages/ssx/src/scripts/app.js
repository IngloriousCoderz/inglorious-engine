import { getModuleName } from "../module.js"

/**
 * Generate the code that goes inside the <!-- SSX --> marker.
 * This creates the types and entities objects for the client-side store.
 */
export function generateApp(store, renderedPages) {
  // Collect all unique page modules and their exports
  const pageImports = new Map()
  const routeEntries = []

  for (const { page, module } of renderedPages) {
    const importPath = "@/pages/" + page.modulePath

    const exportName = getModuleName(module)

    pageImports.set(importPath, exportName)

    routeEntries.push(`      '${page.path}': '${exportName}'`)
  }

  // Generate import statements
  const imports = Array.from(pageImports.entries())
    .map(
      ([importPath, exportName]) =>
        `import { ${exportName} } from '${importPath}'`,
    )
    .join("\n")

  // Generate routes object
  const routes = routeEntries.join(",\n")

  // Generate type registrations
  const typeEntries = Array.from(pageImports.values())
    .map((name) => `  ${name}`)
    .join(",\n")

  return `import { createDevtools, createStore, mount, router } from "@inglorious/web"
${imports}

const types = {
  router,
${typeEntries}
}

const entities = {
  router: {
    type: 'router',
    routes: {
${routes}
    }
  },
${JSON.stringify(store.getState(), null, 2).slice(1, -1)}
}

const middlewares = []
if (import.meta.env.DEV) {
  middlewares.push(createDevtools().middleware)
}

const store = createStore({ types, entities, middlewares })

const root = document.getElementById("root")
root.innerHTML = ""

mount(store, (api) => {
  const { route } = api.getEntity("router")
  return api.render(route, { allowType: true })
}, root)`
}
