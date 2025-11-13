import type { TemplateResult } from "lit-html"
import type { Store, Api as StoreApi } from "@inglorious/store"

export type Api = StoreApi & {
  /**
   * Renders a single entity by its ID.
   * @param id The ID of the entity to render.
   * @returns The rendered template or null.
   */
  render: (id: string) => TemplateResult | null
}

/**
 * Mounts a lit-html template to the DOM and subscribes to a store for re-rendering.
 * @param store The application state store.
 * @param renderFn The root render function that receives the API and returns a template.
 * @param element The DOM element to mount the template to.
 * @returns An unsubscribe function.
 */
export function mount(
  store: Store,
  renderFn: (api: Api) => TemplateResult | null,
  element: HTMLElement | DocumentFragment,
): () => void
