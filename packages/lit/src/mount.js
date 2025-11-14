import { render } from "lit-html"

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
    render(id) {
      const entity = api.getEntity(id)
      const types = api.getTypes()

      if (!entity) {
        return types[id].render(api)
      }

      const type = types[entity.type]
      return type.render(entity, api)
    },
  }

  const unsubscribe = store.subscribe(() => render(renderFn(api), element))
  store.notify("init")

  return unsubscribe
}
