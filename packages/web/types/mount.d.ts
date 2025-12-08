import type { TemplateResult } from "lit-html"
import type { Store, Api as StoreApi } from "@inglorious/store"

/**
 * The result of a reactive selector.
 * @template T The type of the selected value.
 */
export type ReactiveSelectorResult<T> = {
  /** The current value of the selected state. */
  readonly value: T
  /** A function to stop listening for updates. */
  unsubscribe: () => void
}

export type Api = StoreApi & {
  /**
   * Selects a slice of the application state and returns a reactive object.
   * The value will update whenever the selected part of the state changes.
   *
   * @template T The type of the selected state slice.
   * @param selectorFn A function that takes the API and returns a slice of the state.
   * @returns A reactive result object with the current value and an unsubscribe function.
   */
  select: <T>(selectorFn: (api: Api) => T) => ReactiveSelectorResult<T>

  /**
   * Renders an entity or a type component by its ID.
   * @param id The ID of the entity or type to render.
   * @param options Rendering options.
   * @returns The rendered template or an empty string if not found.
   */
  render: (
    id: string,
    options?: { allowType?: boolean },
  ) => TemplateResult | string
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
