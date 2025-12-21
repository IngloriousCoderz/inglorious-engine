import type { TemplateResult } from "lit-html"
import type { Api } from "./mount"

/**
 * Represents the visible range of items in the list.
 */
export interface VisibleRange {
  start: number
  end: number
}

/**
 * Represents the state of a list entity.
 */
export interface ListEntity<T = any> {
  /** A unique identifier for the list entity. */
  id: string | number
  /** The entity type (usually 'list'). */
  type: string
  /** The array of items to render. */
  items: T[]
  /** The current scroll position of the list container. */
  scrollTop: number
  /** The range of items currently visible (plus buffer). */
  visibleRange: VisibleRange
  /** The height of the viewport in pixels. */
  viewportHeight: number
  /** The number of extra items to render above and below the visible range. */
  bufferSize: number
  /** The fixed height of each item in pixels, or null if measuring. */
  itemHeight: number | null
  /** The estimated height of an item, used before measurement. */
  estimatedHeight: number
  /** Any other custom properties. */
  [key: string]: any
}

/**
 * The list type implementation.
 */
export declare const list: {
  /**
   * Initializes the list entity with default state.
   * @param entity The list entity.
   */
  create(entity: ListEntity): void

  /**
   * Handles the scroll event to update the visible range.
   * @param entity The list entity.
   * @param containerEl The scrolling container element.
   */
  scroll(entity: ListEntity, containerEl: HTMLElement): void

  /**
   * Mounts the list, measuring the first item to determine item height.
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
   * Default item renderer.
   * @param item The item to render.
   * @param index The index of the item.
   * @param api The store API.
   */
  renderItem(item: any, index: number, api: Api): TemplateResult
}
