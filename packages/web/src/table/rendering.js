import { html } from "lit-html"
import { classMap } from "lit-html/directives/class-map.js"
import { ref } from "lit-html/directives/ref.js"

import { filters } from "./filters"
import { getPaginationInfo, getRows, getSortDirection } from "./logic"

const DIVISOR = 2
const FIRST_PAGE = 0
const LAST_PAGE = 1
const PRETTY_PAGE = 1
const PERCENTAGE_TO_FLEX = 0.01

export const rendering = {
  mount(entity, containerEl) {
    const columns = containerEl.querySelectorAll(":scope > *")
    ;[...columns].forEach((column, index) => {
      entity.columns[index].width = column.offsetWidth
    })
  },

  render(entity, api) {
    const type = api.getType(entity.type)

    return html`<div class="iw-table">
      ${type.renderHeader(entity, api)} ${type.renderBody(entity, api)}
      ${type.renderFooter(entity, api)}
    </div> `
  },

  renderHeader(entity, api) {
    const type = api.getType(entity.type)

    return html`<div class="iw-table-header">
      <div
        class="iw-table-header-row"
        ${ref((el) => {
          if (
            el &&
            entity.columns.some(({ width }) => typeof width === "string")
          ) {
            queueMicrotask(() => {
              api.notify(`#${entity.id}:mount`, el)
            })
          }
        })}
      >
        ${entity.columns.map((column) =>
          type.renderHeaderColumn(entity, column, api),
        )}
      </div>

      ${entity.search && type.renderSearchbar(entity, api)}
    </div>`
  },

  renderHeaderColumn(entity, column, api) {
    return html`<div
      class="iw-table-header-column"
      style=${getColumnStyle(column)}
    >
      <div
        @click=${() =>
          column.isSortable &&
          api.notify(`#${entity.id}:sortChange`, column.id)}
        class="iw-table-header-title"
      >
        ${column.title} ${getSortIcon(getSortDirection(entity, column.id))}
      </div>

      ${column.isFilterable && filters.render(entity, column, api)}
    </div>`
  },

  renderSearchbar(entity, api) {
    return html`<input
      name="search"
      type="text"
      placeholder=${entity.search.placeholder ?? "Fuzzy search..."}
      value=${entity.search.value}
      @input=${(event) =>
        api.notify(`#${entity.id}:searchChange`, event.target.value)}
      class="iw-table-searchbar"
    />`
  },

  renderBody(entity, api) {
    const type = api.getType(entity.type)

    return html`<div class="iw-table-body">
      ${getRows(entity).map((row, index) =>
        type.renderRow(entity, row, index, api),
      )}
    </div>`
  },

  renderRow(entity, row, index, api) {
    const type = api.getType(entity.type)
    const rowId = row[entity.rowId ?? "id"]

    return html`<div
      @click=${() => api.notify(`#${entity.id}:rowToggle`, rowId)}
      class="iw-table-row ${classMap({
        "iw-table-row-even": index % DIVISOR,
        "iw-table-row-selected": entity.selection?.includes(rowId),
      })}"
    >
      ${entity.columns.map((column, index) =>
        type.renderCell(entity, row[column.id], index, api),
      )}
    </div>`
  },

  renderCell(entity, cell, index, api) {
    const type = api.getType(entity.type)
    const column = entity.columns[index]

    return html`<div
      class="iw-table-cell ${classMap({
        "iw-table-cell-number": column.type === "number",
        "iw-table-cell-date": column.type === "date",
        "iw-table-cell-boolean": column.type === "boolean",
      })}"
      style=${getColumnStyle(column)}
    >
      ${type.renderValue(cell, column, api)}
    </div>`
  },

  renderValue(value) {
    return value
  },

  renderFooter(entity, api) {
    const type = api.getType(entity.type)
    const pagination = getPaginationInfo(entity)

    return html`<div class="iw-table-footer">
        <div class="iw-table-footer-row">
          <div>
            ${pagination.start + PRETTY_PAGE} to ${pagination.end} of ${pagination.totalRows}
            entries
          </div>

          ${type.renderPagination(entity, pagination, api)}

          <div class="iw-table-footer-row">
            <div>Page size:</div>
            <select
              name="pageSize"
              @change=${(event) =>
                api.notify(
                  `#${entity.id}:pageSizeChange`,
                  Number(event.target.value),
                )}
            >
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
          </div>
        </div>
      </div>
    </div>`
  },

  renderPagination(entity, pagination, api) {
    return html`<div class="iw-table-row">
      <button
        ?disabled=${!pagination.hasPrevPage}
        @click=${() => api.notify(`#${entity.id}:pageChange`, FIRST_PAGE)}
        class="iw-table-pagination-button"
      >
        |&#10094;
      </button>
      <button
        ?disabled=${!pagination.hasPrevPage}
        @click=${() => api.notify(`#${entity.id}:pagePrev`)}
        class="iw-table-pagination-button"
      >
        &#10094;
      </button>
      <input
        name="page"
        type="number"
        min="1"
        max=${pagination.totalPages}
        value=${pagination.page + PRETTY_PAGE}
        class="iw-table-page-input"
        @input=${(event) =>
          api.notify(
            `#${entity.id}:pageChange`,
            Number(event.target.value) - PRETTY_PAGE,
          )}
      />
      /
      <span>${pagination.totalPages}</span>
      <button
        ?disabled="${!pagination.hasNextPage}"
        @click=${() => api.notify(`#${entity.id}:pageNext`)}
        class="iw-table-pagination-button"
      >
        &#10095;
      </button>
      <button
        ?disabled=${!pagination.hasNextPage}
        @click=${() =>
          api.notify(
            `#${entity.id}:pageChange`,
            pagination.totalPages - LAST_PAGE,
          )}
        class="iw-table-pagination-button"
      >
        &#10095;|
      </button>
    </div>`
  },
}

function getColumnStyle(column) {
  if (typeof column.width === "string") {
    if (column.width?.endsWith("%")) {
      // eslint-disable-next-line no-magic-numbers
      const percentage = Number(column.width.slice(0, -1))
      return `flex: ${percentage * PERCENTAGE_TO_FLEX}`
    }

    return `width: ${column.width}`
  }

  return `width: ${column.width}px`
}

function getSortIcon(direction) {
  switch (direction) {
    case "asc":
      return "▲"
    case "desc":
      return "▼"
    default:
      return "▲▼"
  }
}
