import { html } from "lit-html"
import { ref } from "lit-html/directives/ref.js"

const LIST_START = 0

export const list = {
  init(entity) {
    resetList(entity)
  },

  create(entity) {
    resetList(entity)
  },

  render(entity, api) {
    const { items, visibleRange, viewportHeight, itemHeight, estimatedHeight } =
      entity
    const types = api.getTypes()
    const type = types[entity.type]

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
        style="height: ${viewportHeight}px; overflow: auto"
        @scroll=${(e) => api.notify(`#${entity.id}:scroll`, e.target)}
        ${ref((el) => {
          if (el && !itemHeight) {
            queueMicrotask(() => {
              api.notify(`#${entity.id}:measureHeight`, el)
            })
          }
        })}
      >
        <div style="height: ${totalHeight}px; position: relative">
          ${visibleItems.map((item, idx) => {
            const absoluteIndex = visibleRange.start + idx
            const top = absoluteIndex * height

            return html`
              <div
                style="position: absolute; top: ${top}px; width: 100%"
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

  measureHeight(entity, containerEl) {
    const firstItem = containerEl.querySelector("[data-index]")
    if (!firstItem) return

    entity.itemHeight = firstItem.offsetHeight
  },
}

function resetList(entity) {
  entity.scrollTop = 0
  entity.visibleRange ??= { start: 0, end: 20 }
  entity.viewportHeight ??= 600
  entity.bufferSize ??= 5
  entity.itemHeight ??= null
  entity.estimatedHeight ??= 50
}
