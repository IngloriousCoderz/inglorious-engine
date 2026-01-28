import type { TemplateResult } from "lit-html"
import type { Api } from "./mount"

/**
 * Represents a single item in the list's data array.
 * It's a generic record but should ideally have a unique `id`.
 */
export type ListItem = Record<string, any> & { id: string | number }

/**
 * Represents the state of a virtualized list entity.
 */
export interface ListEntity<T extends ListItem = ListItem> {
  /** A unique identifier for the list entity. */
  id: string | number

  /** The entity type, used to look up rendering logic. */
  type: string

  /** The full array of items for the list. */
  items: T[]

  /** The current scroll position from the top in pixels. */
  scrollTop: number

  /** The start and end indices of the currently visible items (including buffer). */
  visibleRange: { start: number; end: number }

  /** The height of the visible viewport in pixels. */
  viewportHeight: number

  /** The number of items to render outside the viewport (above and below). */
  bufferSize: number

  /** The measured height of a single item in pixels. Null until measured on mount. */
  itemHeight: number | null

  /** An estimated height for items used for calculations before they are measured. */
  estimatedHeight: number

  /** Any other custom properties. */
  [key: string]: any
}

/**
 * The list type implementation, combining logic and rendering.
 */
export declare const list: {
  /**
   * Initializes the list entity with default state.
   * @param entity The list entity to initialize.
   */
  create(entity: ListEntity): void

  /**
   * Handles the scroll event to update the visible range of items.
   * @param entity The list entity.
   * @param containerEl The scrolling container element.
   */
  scroll(entity: ListEntity, containerEl: HTMLElement): void

  /**
   * Mounts the list, measuring the first item to determine the `itemHeight`
   * for accurate virtualization calculations.
   * @param entity The list entity.
   * @param containerEl The scrolling container element.
   */
  mount(entity: ListEntity, containerEl: HTMLElement): void

  /**
   * Renders the virtualized list component.
   * @param entity The list entity.
   * @param api The store API.
   */
  render(entity: ListEntity, api: Api): TemplateResult

  /**
   * Renders a single item in the list. This is a default implementation
   * and is expected to be overridden by a specific list type.
   * @param entity The list entity.
   * @param payload The payload for rendering the item.
   * @param payload.item The item data.
   * @param payload.index The item's absolute index in the full list.
   * @param api The store API.
   */
  renderItem(
    entity: ListEntity,
    payload: { item: ListItem; index: number },
    api: Api,
  ): TemplateResult
}
