import { html, render } from "lit-html"

/**
 * Mounts a lit-html template to the DOM and subscribes to a store for re-rendering.
 * @param {import('@inglorious/store').Store} store - The application state store.
 * @param {(api: import('../types/mount').Api) => import('lit-html').TemplateResult | null} renderFn - The root render function.
 * @param {HTMLElement | DocumentFragment} element - The DOM element to mount the template to.
 * @returns {() => void} An unsubscribe function
 */
export function mount(store, renderFn, element) {
  const api = {
    ...store._api,

    /** @param {string} id */
    render(id, options = {}) {
      const entity = api.getEntity(id)
      const types = api.getTypes()

      if (!entity) {
        const { allowType } = options
        if (!allowType) {
          return ""
        }

        // No entity with this ID, try static type
        const type = types[id]
        if (!type?.render) {
          console.warn(`No entity or type found: ${id}`)
          return html`<div>Not found: ${id}</div>`
        }
        return type.render(api)
      }

      // Entity exists, render it
      const type = types[entity.type]
      if (!type?.render) {
        console.warn(`No render function for type: ${entity.type}`)
        return html`<div>No renderer for ${entity.type}</div>`
      }

      return type.render(entity, api)
    },
  }

  const unsubscribe = store.subscribe(() => render(renderFn(api), element))
  store.notify("init")

  return unsubscribe
}
