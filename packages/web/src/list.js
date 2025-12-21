import { html } from "lit-html"
import { ref } from "lit-html/directives/ref.js"
import { styleMap } from "lit-html/directives/style-map.js"

const LIST_START = 0
const PRETTY_INDEX = 1

/**
 * @typedef {import('../types/list').ListEntity} ListEntity
 * @typedef {import('../types/mount').Api} Api
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

export const list = {
  /**
   * Initializes the list entity with default state.
   * @param {ListEntity} entity
   */
  create(entity) {
    resetList(entity)
  },

  /**
   * Handles the scroll event to update the visible range.
   * @param {ListEntity} entity
   * @param {HTMLElement} containerEl
   */
  scroll(entity, containerEl) {
    const scrollTop = containerEl.scrollTop
    const { items, bufferSize, itemHeight, estimatedHeight, viewportHeight } =
      entity
    const height = itemHeight || estimatedHeight

    const start = Math.max(
      LIST_START,
      Math.floor(scrollTop / height) - bufferSize,
    )
    const visibleCount = Math.ceil(viewportHeight / height)
    const end = Math.min(start + visibleCount + bufferSize, items.length)

    if (
      entity.visibleRange.start === start &&
      entity.visibleRange.end === end
    ) {
      return
    }

    entity.scrollTop = scrollTop
    entity.visibleRange = { start, end }
  },

  /**
   * Mounts the list, measuring the first item to determine item height.
   * @param {ListEntity} entity
   * @param {HTMLElement} containerEl
   */
  mount(entity, containerEl) {
    const firstItem = containerEl.querySelector("[data-index]")
    if (!firstItem) return

    entity.itemHeight = firstItem.offsetHeight
    entity.visibleRange = {
      start: 0,
      end: Math.ceil(entity.viewportHeight / entity.itemHeight),
    }
  },

  /**
   * Renders the virtualized list component.
   * @param {ListEntity} entity
   * @param {Api} api
   * @returns {TemplateResult}
   */
  render(entity, api) {
    const { items, visibleRange, viewportHeight, itemHeight, estimatedHeight } =
      entity
    const type = api.getType(entity.type)

    if (!items) {
      console.warn(`list entity ${entity.id} needs 'items'`)
      return html``
    }

    if (!type.renderItem) {
      console.warn(`type ${entity.type} needs 'renderItem' method`)
      return html``
    }

    const visibleItems = items.slice(visibleRange.start, visibleRange.end)
    const height = itemHeight || estimatedHeight
    const totalHeight = items.length * height

    return html`
      <div
        style=${styleMap({ height: `${viewportHeight}px`, overflow: "auto" })}
        @scroll=${(e) => api.notify(`#${entity.id}:scroll`, e.target)}
        ${ref((el) => {
          if (el && !itemHeight) {
            queueMicrotask(() => {
              api.notify(`#${entity.id}:mount`, el)
            })
          }
        })}
      >
        <div
          style=${styleMap({
            height: `${totalHeight}px`,
            position: "relative",
          })}
        >
          ${visibleItems.map((item, idx) => {
            const absoluteIndex = visibleRange.start + idx
            const top = absoluteIndex * height

            return html`
              <div
                style=${styleMap({
                  position: "absolute",
                  top: `${top}px`,
                  width: "100%",
                })}
                data-index=${absoluteIndex}
              >
                ${type.renderItem(item, absoluteIndex, api)}
              </div>
            `
          })}
        </div>
      </div>
    `
  },

  /**
   * Default item renderer.
   * @param {any} item
   * @param {number} index
   * @param {Api} api
   * @returns {TemplateResult}
   */
  // eslint-disable-next-line no-unused-vars
  renderItem(item, index, api) {
    return html`<div>${index + PRETTY_INDEX}. ${JSON.stringify(item)}</div>`
  },
}

/**
 * Resets the list entity state.
 * @param {ListEntity} entity
 */
function resetList(entity) {
  entity.scrollTop = 0
  entity.visibleRange ??= { start: 0, end: 20 }
  entity.viewportHeight ??= 600
  entity.bufferSize ??= 5
  entity.itemHeight ??= null
  entity.estimatedHeight ??= 50
}
